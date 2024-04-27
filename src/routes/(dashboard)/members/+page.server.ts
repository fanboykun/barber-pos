import { getAllMembers } from "$lib/server/functions/member"
import { fail, type Action, type Actions } from "@sveltejs/kit"
import { addMember } from "$lib/server/functions/member"
import type { PageServerLoad } from "./$types"
import { validateAddMember } from "./(validation)"


export const load: PageServerLoad = async () => {
    const members = getAllMembers()
    return {
        members
    }
}


export const actions: Actions = {
            createMember: async ( { request } ) => {
                const formData = await request.formData()
                console.log(formData)

                const [ phone, name, password ] = [ 
                    String(formData.get('name')), 
                    Number(formData.get('phone')), 
                    String(formData.get('password')) 
                ]
                

                const [failed, result] = validateAddMember(String(name), Number(phone), password)
                if(failed) return fail(401, { errors: result, success: false })

                const newMember = await addMember(Number(phone), String(name), password)
                return {
                    success: true,
                    data: newMember
            }

        }
// const createMember: Action = async ( { request } ) => {
//     const formData = await request.formData()

//     const [ phone, name, password ] = [ String(formData.get('name')), Number(formData.get('phone')), String(formData.get('password')) ]
//     const [failed, result] = validateAddMember(name, phone, password)
//     if(failed) return fail(401, { errors: result, success: false })

//     const newMember = await AddMember(phone, name, password)
//     return {
//         success: true,
//         data: newMember
//     } 
}