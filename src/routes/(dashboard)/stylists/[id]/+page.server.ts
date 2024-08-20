import { getStylistWithTransactionById } from "$lib/server/functions/stylist"
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ( event ) => {
    if ( !event.locals.session || ( event.locals.user === null || event.locals.user?.role !== "ADMIN" ) ) {
        return redirect(302, '/');
    }

    const stylist = getStylistWithTransactionById(event.params.id.trim())
    return {
        stylist
    }
}