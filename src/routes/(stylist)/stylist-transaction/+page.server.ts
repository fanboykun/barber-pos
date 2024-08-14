import {  redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"
import { getStylistTransactions } from "$lib/server/functions/stylist";

export const load: PageServerLoad = async (event) => {
    if (!event.locals.session || event.locals.user?.role != "USER") {
        redirect(302, '/');
    }
    const transactions = await getStylistTransactions(event.locals.session.userId)
    return {
        transactions
    }
}