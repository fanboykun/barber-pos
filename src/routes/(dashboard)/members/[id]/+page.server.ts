import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types"
import { Pagination } from "$lib/server/utils/pagination";
import { getCustomerById } from "$lib/server/functions/customer";
import { getCustomerAllTransactionsWithPagination, getMembersTotalTransaction } from "$lib/server/functions/member";

export const load: PageServerLoad = async ( event ) => {
    if ( !event.locals.session || ( event.locals.user === null || event.locals.user?.role !== "ADMIN" ) ) {
        return redirect(302, '/');
    }

    const customerId = event.params.id.trim()
    const customer = await getCustomerById(customerId)
    if(!customer) return redirect(300, '/members')

    const transactionCount = await getMembersTotalTransaction(customerId)
    const paginate = new Pagination(transactionCount, 10, event.url.pathname)
    let currentPageFromParam = Number(event.url.searchParams.get('page'))
    if(isNaN(currentPageFromParam) || currentPageFromParam == 0) { currentPageFromParam = 1 }
    paginate.move(Number(currentPageFromParam))

    const transactions = getCustomerAllTransactionsWithPagination(customerId, paginate.pagination.skip, paginate.pagination.take)
    return {
        customer,
        transactions: transactions,
        transactionCount: transactionCount,
        pagination: paginate.pagination
    }
}