import { getAllMembersWithPagination, getMemberById, getMembersCount, updateMemberPointAfterTransactionWithDiscount, updateMemberPointAfterTransactionWithoutDiscount } from '$lib/server/functions/member.js'
import { getAllPoints, getPointById } from '$lib/server/functions/point.js'
import { getAllStylists } from '$lib/server/functions/stylist.js'
import { getAllTreatments } from '$lib/server/functions/treatment.js'
import { fail, redirect, type Action, type Actions } from '@sveltejs/kit'
import { validateAddTransaction } from '../(validation)/index.js'
import { addTransaction, type TransactionFormDataValidated } from '$lib/server/functions/transaction.js'
import type { Customers, Points } from '@prisma/client'

export const load = async (event) => {
    if(!event.locals.user) {
        return redirect(302, '/')
    }
    // const treatments = getAllTreatments()
    // const points = getAllPoints()
    // const stylists = getAllStylists()
    // const members = getAllMembers()
    const creation = async () => {
        const [treatments, points, stylists] = await Promise.all([
            getAllTreatments(),
            getAllPoints(),
            getAllStylists(),
            // getAllMembers()
        ]);
        
        return { treatments, points, stylists };
    }
    return {
        all: creation()
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

const createTransaction: Action = async ( { request } ) => {
    const form = await request.formData()
    const data = {
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
        // if customer & point provided, check it's existance
        let member: Customers|null = null
        let point: Points|null = null
        if(data.customerId) { member = await getMemberById(data.customerId) }
        if(data.pointId) { point = await getPointById(data.pointId) }

        // save transaction to db
        const transaction = await addTransaction(data as TransactionFormDataValidated)
        if(!transaction) return fail(400, { message: 'Failed to create Transaction', success: false })

        // update the member's point value if member exists
        if(member) {
            // update member's point if discount is selected
            if(point) {
                if(member.total_point < point.minimum) return fail(400, { message: 'Failed to update point, member`s current point must be greater than minimum discount point' })
                const updatedMemberPoint = await updateMemberPointAfterTransactionWithDiscount(member.id, member.total_point, point.minimum , data.totalPoint) // customer id is required
                if(!updatedMemberPoint) return fail(400, { message: 'Failed to update point, unable to update member`s current point ' })
            }else {
                // update member's point if discount is not selected
                const updatedMemberPoint = await updateMemberPointAfterTransactionWithoutDiscount(member.id, member.total_point, data.totalPoint) // customer id is required
                if(!updatedMemberPoint) return fail(400, { message: 'Failed to update point, unable to update member`s current point ' })
            }
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

export const actions: Actions = { getCustomers, createTransaction, getCustomer }
