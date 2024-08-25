import { getAllMembersWithPagination, getMemberById, getMembersCount, updateMemberPointAfterTransactionWithDiscount, updateMemberPointAfterTransactionWithoutDiscount, updateMemberPointBeforeTransactionDeletedOrUpdated } from '$lib/server/functions/member.js'
import { getAllPoints, getPointById } from '$lib/server/functions/point.js'
import { getAllStylists } from '$lib/server/functions/stylist.js'
import { getAllTreatments } from '$lib/server/functions/treatment.js'
import { fail, redirect, type Action, type Actions } from '@sveltejs/kit'
import { validateAddTransaction } from '../(validation)/index.js'
import { getTransactionById, type TransactionFormDataValidated, updateTransaction as editTransaction, updateTransactionDetailTreatment } from '$lib/server/functions/transaction.js'
import type { Customers, Points } from '@prisma/client'

export const load = async (event) => {
    if ( !event.locals.session || ( event.locals.user === null || event.locals.user?.role !== "ADMIN" ) ) {
        return redirect(302, '/');
    }

    const transactionId = event.params.id
    if(!transactionId) return redirect(300, '/transactions')
        
    const transaction = await getTransactionById(transactionId)
    if(!transaction) return redirect(300, '/transactions')

    const creation = async () => {
        const [treatments, points, stylists] = await Promise.all([
            getAllTreatments(),
            getAllPoints(),
            getAllStylists(),
        ]);
        
        return { treatments, points, stylists };
    }
    return {
        all: creation(),
        transaction
        // treatments, points, stylists, members
    }
}

const getCustomers: Action = async ({request}) => {
    const f = await request.formData()
    const search = f.get('searchCustomer') as unknown as string ?? ''
    const [allMembers, membersCount] = await Promise.all([getAllMembersWithPagination({ search: search }), getMembersCount()])
    return { 
        'allMembers': allMembers,
        'membersCount': membersCount
     }
}

const updateTransaction: Action = async ( { request, params } ) => {
    const form = await request.formData()
    const data = {
        'transactionId': form.get('transactionId') as string,
        'stylistId': form.get('stylistId') as string,
        'customerId': form.get('customerId') as string | undefined,
        'treatmentId': form.get('treatmentId') as string,
        'pointId': form.get('pointId') as string | undefined,
        'normalPrice': Number(form.get('normalPrice')) as unknown as number,
        'totalDiscount': Number(form.get('totalDiscount')) as unknown as number | undefined,
        'totalPrice': Number(form.get('totalPrice')) as unknown as number,
        'totalPoint': Number(form.get('totalPoint')) as unknown as number
    }
    const [err, res] = validateAddTransaction(data)
    if(err) return fail(400, { message: 'Form is invalid', error: res, success: false })
    
    try {
        // check is the current transactionId and customerId is the same from the form
        const currentTransactionId = params.id
        if(!currentTransactionId || !data.transactionId || data.transactionId !== currentTransactionId) return fail(400, { message: 'Transaction is missing', success: false })
        const oldTransaction = await getTransactionById(currentTransactionId)
        if(!oldTransaction) return fail(400, { message: 'Transaction is missing', success: false })

        // if customer & point provided, check it's existance
        let member: Customers|null = null
        let point: Points|null = null
        if(data.customerId) { member = await getMemberById(data.customerId) }
        if(data.pointId) { point = await getPointById(data.pointId) }

        // save transaction to db
        const transaction = await editTransaction(data as TransactionFormDataValidated & { transactionId: string } )
        if(!transaction) return fail(400, { message: 'Failed to update Transaction', success: false })
        const oldTransactionDetail = oldTransaction.transactionDetails[0]
        if(oldTransactionDetail.treatmentId != data.treatmentId) {
            const updatedTransactionTreatment = await updateTransactionDetailTreatment(oldTransactionDetail.id, data.treatmentId)
            if(!updatedTransactionTreatment) return fail(400, { message: 'Failed to update Transaction Details', success: false })
        }

        if(oldTransaction.customerId != data.customerId || oldTransaction.pointId != data.pointId) {
            const updateMemberPointResult = await setMemberPointAfterTransaction(oldTransaction.customer, oldTransaction.totalPoint, member, point, data.totalPoint)
            if(!updateMemberPointResult.success) return fail(400, { success: false, message: updateMemberPointResult.message })
        }
        return transaction
    } catch (err) { return fail(400, { message: 'Failed to create Transaction', success: false }) }

}

const getCustomer: Action = async ( { request } ) => {
    const f = await request.formData()
    const customerId = f.get('customerId') as unknown as string
    const customer = await getMemberById(customerId)
    if(!customer) return fail(401, { message: 'customer not found!', success: false })
    return customer
}

const setMemberPointAfterTransaction = async (oldMember: Customers|null, currentTotalPoint: number, member: Customers | null, point: Points | null, totalPoint: number) => {
    if( oldMember && oldMember.id != member?.id ) {
        const updatedOldMemberPoint = updateMemberPointBeforeTransactionDeletedOrUpdated(oldMember, point, currentTotalPoint)
        if(!updatedOldMemberPoint) return { success: false, message: 'Failed to update Current Custtomer Point Value' }
    }
    // update the member's point value if new member exists
    // update member's point if discount is selected
    if(member && point) {
        if(member.total_point < point.minimum) return { success: false, message: 'Failed to update point, member`s current point must be greater than minimum discount point' }
        const updatedMemberPoint = await updateMemberPointAfterTransactionWithDiscount(member.id, member.total_point, point.minimum , totalPoint) // customer id is required
        if(!updatedMemberPoint) return { success: false, message: 'Failed to update point, unable to update member`s current point ' }
    }else if(member && !point) {
        // update member's point if discount is not selected
        const updatedMemberPoint = await updateMemberPointAfterTransactionWithoutDiscount(member.id, member.total_point, totalPoint) // customer id is required
        if(!updatedMemberPoint) return { success: false, message: 'Failed to update point, unable to update member`s current point ' }
    }
    return { success: true, message: '' }
}

export const actions: Actions = { getCustomers, updateTransaction, getCustomer }
