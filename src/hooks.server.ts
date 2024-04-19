import { lucia } from "$lib/server/utils/auth";
import { validateCustomerSession } from "$lib/server/utils/customer-auth";
import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

const checkUserSession: Handle = async({event, resolve}) => {
	const sessionId = event.cookies.get(lucia.sessionCookieName);
	if (!sessionId) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const { session, user } = await lucia.validateSession(sessionId);
	if (session && session.fresh) {
		const sessionCookie = lucia.createSessionCookie(session.id);
		// sveltekit types deviates from the de-facto standard
		// you can use 'as any' too
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});
	}
	
	if (!session) {
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});
	}
	event.locals.user = user;
	event.locals.session = session;
	return resolve(event);
}

const checkCustomerSession: Handle = async({event, resolve}) => {
	// check if the request path need the customer session
	const request_url = event.url.pathname
	const customerSessionEndpoint = [
		'/', '/sign-in', '/register', '/member', '/sign-out'
	]

	if(!customerSessionEndpoint.includes(request_url)) {
		// console.log(`${request_url} not get hit`)
		return resolve(event)
	}
	
	// console.log(`${request_url} get hit`)
	const customerSession = event.cookies.get('customer-session')
	if(!customerSession) {
		return resolve(event)
	}

	const customerData = await validateCustomerSession(customerSession)
	if(!customerData) {
		event.locals.customer = null
		return resolve(event)
	}

	event.locals.customer = customerData
	return resolve(event)
}

export const handle = sequence(checkUserSession, checkCustomerSession)
