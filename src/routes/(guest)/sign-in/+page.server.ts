import { fail, type Action, type Actions, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { loginCustomerValidation } from "$lib/validation/index.server";
import { Argon2id } from "oslo/password";
import { findCustomerByPhone } from "$lib/server/functions/customer";
import { createCustomerSession } from "$lib/server/utils/customer-auth";

export const load:PageServerLoad = async (event) => {
    if (event.locals.customer) {
        return redirect(302, "/member");
    }
}

const login: Action = async ({ cookies, request }) => {
    const data = await request.formData();
    const [ fails, result ] = loginCustomerValidation(data)

    if(fails) return fail(400, { errors: result })
    
    const phone = data.get('phone')
    const existingCustomer = await findCustomerByPhone(phone as string)
    if(!existingCustomer) return fail(500, { message: 'Customer does not exists' })
    // compare the password here
    if(!await new Argon2id().verify(existingCustomer.password, data.get('password') as string)) {
        return fail(500, { message: 'Invalid password' })
    }

    await createCustomerSession(existingCustomer, cookies)
    return redirect(302, "/member");
}

export const actions: Actions = { login }