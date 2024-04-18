import { Argon2id } from 'oslo/password';
import db from '../utils/prisma'
import { v4 as uuid } from "uuid";
import type { Customers } from '@prisma/client';

export type createCustomerDto = {
    phone: number|string;
    name: string;
    password: string;
} 

export const createCustomer = async (data: createCustomerDto): Promise<Customers|null> => {
    try {
        const hashed_password = await new Argon2id().hash(data.password);
        // const userId = generateId(15);

        // const hashed_password = await bcrypt.hash(data.password, SALT_NUMBER);
        const userId = uuid();
        const newCustomer = await db.customers.create({
            data: {
                id: userId, // Add the id property here
                phone: data.phone as number,
                name: data.name,
                password: hashed_password,
                total_point: 0
            }
        })
        return newCustomer

    } catch(err) {
        console.log(err)
        return null
    }

}

export const findCustomerByPhone = async(phone: string|number) : Promise<Customers | null> => {
    try {
        const customer = await db.customers.findFirst({
            where: {
                phone: phone as number
            }
        })
        return customer
    } catch(err) {
        console.log(err)
        return null
    }
}