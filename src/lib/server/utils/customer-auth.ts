import type { Customers } from "@prisma/client";
import type { Cookies } from "@sveltejs/kit";
import { HMAC } from "oslo/crypto";
import { createJWT, validateJWT } from "oslo/jwt";
import { TimeSpan } from "oslo";
import { dev } from "$app/environment";

const secret = await new HMAC("SHA-256").generateKey();

export const createCustomerSession = async (customer: Customers, cookies: Cookies) => {
    const jwt = await createJWT("HS256", secret, customer, {
        expiresIn: new TimeSpan(30, "d"),
    })

    cookies.set('customer-session', jwt, {
        path: ".",
        secure: !dev
    })
}

export const validateCustomerSession = async(jwt_payload: string) => {
    try {
        const jwt = await validateJWT("HS256", secret, jwt_payload)
        return jwt.payload as Customers
    } catch (err) {
        console.log(err)
        return null
    }
}