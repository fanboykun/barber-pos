
import {  redirect, type Action, type Actions } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"
import { getAllTransactions } from "$lib/server/functions/transaction";

export const load: PageServerLoad = async (event) => {
    if (!event.locals.session) {
        return redirect(302, '/');
     }
    const transactions = getAllTransactions()
    return {
        transactions
    }
}

const createTreatment: Action = async ( { request } ) => {
    const formData = await request.formData()
    return formData
}

const editTreatment: Action = async ( { request } ) => {
    const formData = await request.formData()
    return formData
}

const deleteTreatment: Action = async ( { request } ) => {
    const formData = await request.formData()
    return formData

}

export const actions: Actions = { createTreatment, editTreatment, deleteTreatment }