import { addPoint, deletePointById, getAllPoints, getPointById, updatePoint } from "$lib/server/functions/point";
import { fail, redirect, type Action, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { validateAddPoint, validateEditPoint } from "./(validation)";

export const load: PageServerLoad = async (event) => {
    if (!event.locals.session) {
        return redirect(302, '/');
     }

    const points = getAllPoints()
    return {
        points
    }
}

const createPoint: Action = async( { request } ) => {
    const formData = await request.formData()
    const [name, minimum, discount] = [String(formData.get('name')), Number(formData.get('minimum')), Number(formData.get('discount'))]
    const [failed, result] = validateAddPoint(name, minimum, discount)
    if(failed) return fail(401, { errors: result, success: false })

    const newPoint = await addPoint(name, minimum, discount)
    return {
        success: true,
        data: newPoint
    } 
}

const editPoint: Action = async( { request } ) => {
    const formData = await request.formData()

    const [id, name, minimum, discount] = [String(formData.get('id')), String(formData.get('name')), Number(formData.get('minimum')), Number(formData.get('discount'))]
    const [failed, result] = validateEditPoint(id, name, minimum, discount)
    if(failed) return fail(401, { errors: result, success: false })

    const existingPoint = getPointById(id)
    if(!existingPoint) return fail(401, { message: 'Point Not Found!', success: false })
        
    const updatedPoint = await updatePoint(id, name, minimum, discount)
    return {
        success: true,
        data: updatedPoint
    } 
}

const deletePoint: Action = async( { request } ) => {
    const formData = await request.formData()

    const id = String(formData.get('id'))
    if(!id) return fail(401, { message: 'Point Not Found!', success: false })

    const existingPoint = getPointById(id)
    if(!existingPoint) return fail(401, { message: 'Point Not Found!', success: false })

    const isPointDeleted = await deletePointById(id)
    if(!isPointDeleted) return fail(401, { message: 'Failed To Delete Point', success: false })

    return {
        success: true
    }    
}

export const actions: Actions = {createPoint, editPoint, deletePoint}
