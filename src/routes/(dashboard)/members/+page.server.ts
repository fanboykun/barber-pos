import { getAllMembers } from "$lib/server/functions/member"
import { fail, type Action, type Actions } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"
import { validateAddMember, validateUpdateMember } from "./(validation)"
import { createCustomer, deleteCustomer, getCustomerById, updateMembers } from "$lib/server/functions/customer"
import { get } from "http"


export const load: PageServerLoad = async () => {
    const members = getAllMembers()
    return {
        members
    }
}


export const actions: Actions = {
    createMember: async ( { request } ) => {
        const formData = await request.formData()
        
        const [ name, phone,  password ] = [ 
            String(formData.get('name')), 
            String(formData.get('phone')), 
            String(formData.get('password')) 
        ]
        
        
        const [failed, result] = validateAddMember(name, phone, password)
        if(failed) return fail(401, { errors: result, success: false })
            
            const newMember = await createCustomer({ name: String(name), phone: String(phone), password: password })
            return {
                success: true,
                data: newMember
            }
            
    },

    deleteMember: async ({ request }) => {

        const formData = await request.formData()

        const id = String(formData.get('id'))

        if(!id) return fail(401, { message: 'Member Not Found!', success: false })

        const existingCustomer = await getCustomerById(id)
        if(!existingCustomer) return fail(401, { message: 'Member Not Found!', success: false })

        const isCustomerDeleted = await deleteCustomer(id)
        if(!isCustomerDeleted) return fail(401, { message: 'Failed To Delete Member', success: false })

        return {
            success: true
        }    

    },

    editMember: async ({ request }) => {

        const formData = await request.formData()

        const id: string = String(formData.get('id'))
        const name: string = String(formData.get('name'))
        const phone: string = String(formData.get('phone'))
        const password: string = String(formData.get('password'))

        const [failed, result] = validateUpdateMember(id, name, phone, password)
        if(failed) return fail(401, { errors: result, success: false })

        const existingCustomer = await getCustomerById(id)
        if(!existingCustomer) return fail(401, { message: 'Member Not Found!', success: false })

        const updatedPoint = await updateMembers(id, name, phone, password)
    
        return {
            success: true,
            data: updatedPoint
        } 

    }

}