import { getAllTreatments } from "$lib/server/functions/treatment"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async () => {
    const treatments = getAllTreatments()
    return {
        treatments
    }
}