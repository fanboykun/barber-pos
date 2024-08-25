import { getStylistAllTransactionsWithPagination, getStylistById, getStylistTotalTransaction } from "$lib/server/functions/stylist"
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types"
import { Pagination } from "$lib/server/utils/pagination";

export const load: PageServerLoad = async ( event ) => {
    if ( !event.locals.session || ( event.locals.user === null || event.locals.user?.role !== "ADMIN" ) ) {
        return redirect(302, '/');
    }

    const stylistId = event.params.id.trim()
    const stylist = await getStylistById(stylistId)
    if(!stylist) return redirect(300, '/stylists')

    const transactionCount = await getStylistTotalTransaction(stylistId)
    const paginate = new Pagination(transactionCount, 10, event.url.pathname)
    let currentPageFromParam = Number(event.url.searchParams.get('page'))
    if(isNaN(currentPageFromParam) || currentPageFromParam == 0) { currentPageFromParam = 1 }
    paginate.move(Number(currentPageFromParam))

    const transactions = getStylistAllTransactionsWithPagination(stylistId, paginate.pagination.skip, paginate.pagination.take)
    return {
        stylist,
        transactions: transactions,
        transactionCount: transactionCount,
        pagination: paginate.pagination
    }
}