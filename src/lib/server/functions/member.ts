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

export const getAllMembersWithPagination = async (search: string = '', skip: number = 0, take: number = 10) => {
    try {
        const data = await db.customers.findMany({
            skip: skip,
            take: take,
            where: {
                name: {
                  contains: search,
                },
              },
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

export const getMembersCount = async () => {
    try {
        const data = await db.customers.count()
        return data
    } catch (err) {
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
        const newMember = await db.customers.create({
            data: {
                phone: phone.toString(),
                name: name,
                password: hashed_password
            }
        })
        return newMember
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
/**
 * @param id member id
 * @param usedPoint point used from selected Point for discount
 * @param additionPoint point the members get after transaction
 */
export const updateMemberPointAfterTransaction = async ( id: string, currentPoint: number, usedPoint: number, additionPoint: number ) => {
    try {
        if(currentPoint < usedPoint) return null
        const totalPoint = currentPoint - usedPoint + additionPoint
        const data = await db.customers.update({
            where: {
                id: id
            },
            data: {
                total_point: totalPoint
            }
        })
        return data
    } catch (err) {
        console.log(err)
        return null
    }
}