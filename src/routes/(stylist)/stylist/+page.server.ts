import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { getStylistTotalRevenue, getStylistTotalTransaction } from "$lib/server/functions/stylist";

export const load: PageServerLoad =  async(event) => {
    if (!event.locals.session || ( event.locals.user == null || event.locals.user?.role != "USER" )) {
        return redirect(302, '/');
    }
    const totalRevenue = await getStylistTotalRevenue(event.locals.session.userId)
    const totalTransaction = await getStylistTotalTransaction(event.locals.session.userId)
    return { totalRevenue, totalTransaction }
}