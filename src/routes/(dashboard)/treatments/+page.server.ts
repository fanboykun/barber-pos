import { addTreatment, deleteTreatmentById, getAllTreatments, getTreatmentById, updateTreatments } from "$lib/server/functions/treatment"
import { fail, type Action, type Actions } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"
import { validateAddTreatment, validateUpdateTreatment } from "./(validation)"

export const load: PageServerLoad = async () => {
    const treatments = getAllTreatments()
    return {
        treatments
    }
}

const createTreatment: Action = async ( { request } ) => {
    const formData = await request.formData()

    const [ name, price, point, sub_service ] = [ String(formData.get('name')), Number(formData.get('price')), Number(formData.get('point')), String(formData.get('sub_service')) ]
    const [failed, result] = validateAddTreatment(name, price, point, sub_service)
    if(failed) return fail(401, { errors: result, success: false })

    const newPoint = await addTreatment(name, price, point, sub_service)
    return {
        success: true,
        data: newPoint
    } 
}

const editTreatment: Action = async ( { request } ) => {
    const formData = await request.formData()
    const [ id, name, price, point, sub_service ] = [ String(formData.get('id')), String(formData.get('name')), Number(formData.get('price')), Number(formData.get('point')), String(formData.get('sub_service')) ]
    const [failed, result] = validateUpdateTreatment(id, name, price, point, sub_service)
    if(failed) return fail(401, { errors: result, success: false })

    const existingTreatment = getTreatmentById(id)
    if(!existingTreatment) return fail(401, { message: 'Treatment Not Found!', success: false })

    const updatedPoint = await updateTreatments(id, name, price, point, sub_service)
    return {
        success: true,
        data: updatedPoint
    } 
}

const deleteTreatment: Action = async ( { request } ) => {
    const formData = await request.formData()

    const id = String(formData.get('id'))
    if(!id) return fail(401, { message: 'Treatment Not Found!', success: false })

    const existingTreatment = getTreatmentById(id)
    if(!existingTreatment) return fail(401, { message: 'Treatment Not Found!', success: false })

    const isTreatmentDeleted = await deleteTreatmentById(id)
    if(!isTreatmentDeleted) return fail(401, { message: 'Failed To Delete Treatment', success: false })

    return {
        success: true
    }    

}

export const actions: Actions = { createTreatment, editTreatment, deleteTreatment }