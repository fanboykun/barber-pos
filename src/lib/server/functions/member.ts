import { v4 as uuid } from "uuid";
import db from "../utils/prisma";
import { Argon2id } from "oslo/password";


export const getAllMembers = async() => {
    try {
        const data = await db.customers.findMany({
            orderBy: {
                name: 'desc'
            }
        })
        return data
    } catch(err) {
        console.log(err)
        return null
    }
}

export const getMemberById = async(id: string) => {
    try {
        const data = await db.customers.findUnique({
            where: {
                id: id
            }
        })
        return data
    } catch(err) {
        console.log(err)
        return null
    }
}


export const deleteMemberById = async(id: string) => {
    try {
        await db.customers.delete({
            where: {
                id: id
            }
        })
        return true
    } catch(err) {
        console.log(err)
        return null
    }
}

export const addMember = async(phone: number, name: string, password: string) => {
    try{
        const hashed_password = await new Argon2id().hash(password);
        const newPoint = await db.customers.create({
            data: {
                phone: phone.toString(),
                name: name,
                password: hashed_password
            }
        })
        return newPoint
    } catch(err) {
        console.log(err)
        return null
    }
}

export const updateMember = async(id: string, phone: number, name: string, password: string) => {
    try{
        const hashed_password = await new Argon2id().hash(password);
        const updatedMember = await db.customers.update({
            where: {
                id: id
            },
            data: {
                phone: phone.toString(),
                name: name,
                password: hashed_password
            }
        })
        return updatedMember
    } catch(err) {
        console.log(err)
        return null
    }
}