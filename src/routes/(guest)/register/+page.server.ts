import { fail, type Action, type Actions, redirect } from "@sveltejs/kit";
import { createCustomerValidation } from "$lib/validation/index.server";
import type { PageServerLoad } from "./$types";
import { createCustomer } from "$lib/server/functions/customer";
import { createCustomerSession } from "$lib/server/utils/customer-auth";

export const load:PageServerLoad = async (event) => {
    if (event.locals.customer) {
        redirect(302, "/member");
    }
}

const register: Action = async ({ cookies, request }) => {
    const data = await request.formData();
    const [ fails, result ] = createCustomerValidation(data)

    if(fails) return fail(400, { message: 'Validation failed', errors: result })
    const newCustomer = await createCustomer({ 
            phone: data.get('phone') as string, 
            name: data.get('name') as string, 
            password: data.get('password') as string,      
        })

    if(!newCustomer) return fail(500, { message: 'Failed to create customer' })
    await createCustomerSession(newCustomer, cookies)
    redirect(302, "/member");
}

export const actions: Actions = { register }