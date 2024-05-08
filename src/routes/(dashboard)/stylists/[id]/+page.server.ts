import { getStylistWithTransactionById } from "$lib/server/functions/stylist"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ( { params } ) => {
    const stylist = getStylistWithTransactionById(params.id)
    return {
        stylist
    }
}