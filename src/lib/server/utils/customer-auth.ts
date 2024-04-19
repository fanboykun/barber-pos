import type { Customers } from "@prisma/client";
import type { Cookies } from "@sveltejs/kit";
import { HMAC } from "oslo/crypto";
import { createJWT, validateJWT } from "oslo/jwt";
import { TimeSpan } from "oslo";
import { dev } from "$app/environment";

const secret = await new HMAC("SHA-256").generateKey();
const customerSessionName = 'customer-session' as const
const customerSessionOpts = {
    path: ".",
    secure: !dev
} as const
const customerJwtAlgorithm = "HS256" as const

export const createCustomerSession = async (customer: Customers, cookies: Cookies) => {
    const jwt = await createJWT(customerJwtAlgorithm, secret, customer, {
        expiresIn: new TimeSpan(30, "d"),
    })

    cookies.set(customerSessionName, jwt, customerSessionOpts)
}

export const validateCustomerSession = async(jwt_payload: string) => {
    try {
        const jwt = await validateJWT(customerJwtAlgorithm, secret, jwt_payload)
        return jwt.payload as Customers
    } catch (err) {
        console.log(err)
        return null
    }
}

export const deleteCustomerSessionCookie = async(cookie: Cookies) => {
    try {
        const s = cookie.get(customerSessionName)
        if(!s) return false
        
        cookie.delete(customerSessionName, customerSessionOpts)
        return true
    } catch(err) {
        console.log(err)
        return false
    }
}