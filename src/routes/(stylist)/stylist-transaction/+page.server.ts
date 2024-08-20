import {  redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"
import { Pagination } from "$lib/server/utils/pagination";
import { getStylistAllTransactionsWithPagination, getStylistTotalTransaction } from "$lib/server/functions/stylist";

export const load: PageServerLoad = async (event) => {
    if (!event.locals.session || ( event.locals.user == null || event.locals.user?.role != "USER" )) {
        return redirect(302, '/');
    }
    const stylistId = event.locals.session.userId
    const transactionCount = await getStylistTotalTransaction(stylistId)
    const paginate = new Pagination(transactionCount)
    let currentPageFromParam = Number(event.url.searchParams.get('page'))
    if(isNaN(currentPageFromParam) || currentPageFromParam == 0) { currentPageFromParam = 1 }
    paginate.move(Number(currentPageFromParam))

    const transactions = getStylistAllTransactionsWithPagination(stylistId, paginate.pagination.skip, paginate.pagination.take)
    return {
        transactions: transactions,
        transactionCount: transactionCount,
        pagination: paginate.pagination
    }
}