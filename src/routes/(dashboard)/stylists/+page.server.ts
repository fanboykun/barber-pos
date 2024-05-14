import { fail, redirect, type Action, type Actions } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"
import { validateAddStylist, validateUpdateStylist, validateUpdateStylistPassword } from "./(validation)"
import { addStylist, deleteStylistById, getAllStylists, getStylistById, updateStylists, updateStylistsPassword } from "$lib/server/functions/stylist"
import { Argon2id } from "oslo/password"

export const load: PageServerLoad = async (event) => {
    if (!event.locals.session) {
        return redirect(302, '/');
     }
    const stylists = getAllStylists()
    return {
        stylists
    }
}

const createStylist: Action = async ( { request } ) => {
    const formData = await request.formData()

    const [ name, email, password ] = [ String(formData.get('name')), String(formData.get('email')), String(formData.get('password')) ]
    const [failed, result] = validateAddStylist(name, email, password)
    if(failed) return fail(401, { errors: result, success: false })
    const hashed_password = await new Argon2id().hash(password);

    const newStylist = await addStylist(name, email, hashed_password)
    return {
        success: true,
        data: newStylist
    } 
}

const editStylist: Action = async ( { request } ) => {
    const formData = await request.formData()
    const [ id, name, email ] = [ String(formData.get('id')), String(formData.get('name')), String(formData.get('email')) ]
    const [failed, result] = validateUpdateStylist(id, name, email)
    if(failed) return fail(401, { errors: result, success: false })

    const existingTreatment = await getStylistById(id)
    if(!existingTreatment) return fail(401, { message: 'Treatment Not Found!', success: false })

    const updatedStylist = await updateStylists(id, name, email)
    return {
        success: true,
        data: updatedStylist
    } 
}

const deleteStylist: Action = async ( { request } ) => {
    const formData = await request.formData()

    const id = String(formData.get('id'))
    if(!id) return fail(401, { message: 'Stylist Not Found!', success: false })

    const existingStylist = await getStylistById(id)
    if(!existingStylist) return fail(401, { message: 'Stylist Not Found!', success: false })

    const isStylistDeleted = await deleteStylistById(id)
    if(!isStylistDeleted) return fail(401, { message: 'Failed To Delete Stylist', success: false })

    return {
        success: true
    }    

}

const updatePassword: Action = async ( { request } ) => {
    const formData = await request.formData()

    const [ id, password ] = [ String(formData.get('id')), String(formData.get('password')) ]
    const [failed, result] = validateUpdateStylistPassword(id, password)
    if(failed) return fail(401, { errors: result, success: false })
    const hashed_password = await new Argon2id().hash(password);

    const updatedStylist = await updateStylistsPassword(id, hashed_password)
    if(!updatedStylist) return fail(401, { message: 'Failed To Update Stylist Password', success: false })

    return {
        success: true,
        data: updatedStylist
    } 
}

export const actions: Actions = { createStylist, editStylist, deleteStylist, updatePassword }