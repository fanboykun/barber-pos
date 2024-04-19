import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { deleteCustomerSessionCookie } from "$lib/server/utils/customer-auth";


export const load:PageServerLoad = async () => {
	return redirect(302, '/');
}

export const actions: Actions = {
	default: async (event) => {
		if (!event.locals.customer) {
			console.log('fail no locals')
			return fail(401);
		}
		if(! await deleteCustomerSessionCookie(event.cookies)) return fail(401)
            
		redirect(302, "/");
	}
};