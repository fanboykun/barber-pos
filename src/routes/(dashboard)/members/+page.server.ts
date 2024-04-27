import { getAllMembers } from "$lib/server/functions/member"
import { fail, type Action, type Actions } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"
import { validateAddMember } from "./(validation)"
import { createCustomer } from "$lib/server/functions/customer"


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
            
        }
    }