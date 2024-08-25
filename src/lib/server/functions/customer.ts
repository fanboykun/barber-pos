import { Argon2id } from 'oslo/password';
import db from '../utils/prisma'
import { v4 as uuid } from "uuid";
import type { Customers } from '@prisma/client';

export type createCustomerDto = {
    phone: string;
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
                phone: String(data.phone) as string,
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

export const getCustomerById = async(id: string) => {
    try {
        const member = await db.customers.findUnique({
            where: {
                id: id
            }
        })
        return member
    } catch(err) {
        console.log(err)
        return null
    }
}

export const findCustomerByPhone = async(phone: string|number) : Promise<Customers | null> => {
    try {
        const customer = await db.customers.findFirst({
            where: {
                phone: String(phone) as string
            }
        })
        return customer
    } catch(err) {
        console.log(err)
        return null
    }
}

export const updateMembers = async( id: string, name: string, phone: string, password: string ) => {
    try{
        const hashed_password = await new Argon2id().hash(password);
        const updatedCustomer = await db.customers.update({
            where: {
                id: id
            },
            data: {
                name: name,
                phone: phone,
                password: hashed_password
            }
        })
        return updatedCustomer
    } catch(err) {
        console.log(err)
        return null
    }
}

export const updateMemberPassword = async( id: string, password: string ) => {
    try{
        const hashed_password = await new Argon2id().hash(password);
        const updatedCustomer = await db.customers.update({
            where: {
                id: id
            },
            data: {
                password: hashed_password
            }
        })
        return updatedCustomer
    } catch(err) {
        console.log(err)
        return null
    }
}

export const deleteCustomer = async (id: string): Promise<Customers | null> => {

    try {
        const customer = await db.customers.delete({
            where: {
                id: id
            }
        })
        return customer
    } catch(err) {
        console.log(err)
        return null
    }
}
