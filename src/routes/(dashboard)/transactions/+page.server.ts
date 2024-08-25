import {  fail, redirect, type Action, type Actions } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"
import { deleteTransactionById, getAllTransactionsWithPagination, getTransactionById, getTransactionsCount } from "$lib/server/functions/transaction";
import { Pagination } from "$lib/server/utils/pagination";
import { updateMemberPointBeforeTransactionDeletedOrUpdated } from "$lib/server/functions/member";

export const load: PageServerLoad = async (event) => {
    if ( !event.locals.session || ( event.locals.user === null || event.locals.user?.role !== "ADMIN" ) ) {
        return redirect(302, '/');
    }

    const transactionCount = await getTransactionsCount()
    const paginate = new Pagination(transactionCount, 10, event.url.pathname)
    let currentPageFromParam = Number(event.url.searchParams.get('page'))
    if(isNaN(currentPageFromParam) || currentPageFromParam == 0) { currentPageFromParam = 1 }
    paginate.move(Number(currentPageFromParam))

    const transactions = getAllTransactionsWithPagination(paginate.pagination.skip, paginate.pagination.take)
    return {
        transactions: transactions,
        transactionCount: transactionCount,
        pagination: paginate.pagination
    }
}

const deleteTransaction: Action = async ( { request } ) => {
    const formData = await request.formData()
    const transactionId = formData.get('transactionId') as unknown as string ?? ''
    if(!transactionId) return fail(400, { message: 'Transaction not found!', success: false })

    const transaction = await getTransactionById(transactionId)
    if(!transaction) return fail(400, { message: 'Transaction not found!', success: false })
    
    //update member point first (current member total point + used point in transaction - gathered point from this transaction)
    if(transaction.customer != null) {
        const updatedMemberPoint = await updateMemberPointBeforeTransactionDeletedOrUpdated(transaction.customer, transaction.point, transaction.totalPoint)
        if(!updatedMemberPoint) return fail(400, { message: 'Member`s point failed to update', success: false })
    }

    const isTransactionDeleted = await deleteTransactionById(transaction.id)
    if(!isTransactionDeleted) return fail(400, { message: 'Transaction failed to delete', success: false })
    return { message: 'Transaction deleted!', success: true }

}

export const actions: Actions = { deleteTransaction }