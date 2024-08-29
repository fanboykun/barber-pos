// import { v4 as uuid } from "uuid";
import type { Customers, Points } from "@prisma/client";
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
export const getAllMembersWithPagination = async ( { search = '', skip = 0, take = 10 } ) => {
    try {
        const data = await db.customers.findMany({
            skip: skip,
            take: take,
            where: {
                name: {
                  contains: `%${search}%`,
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

export const getMembersCount = async (search: string = '') => {
    try {
        const data = await db.customers.count({
            where: {
                name: {
                    contains: `%${search}%`
                }
            }
        })
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

export const getMemberTotalPointById = async (customerId: string) => {
    try {
        const data = await db.customers.findFirst({
            where: {
                id: customerId
            },
            select: {
                total_point: true
            }
        })
        return data
    } catch(err) {
        console.log(err)
        return null
    }
}

/**
 * update member's total_point value after transaction with discount
 * @param id member id
 * @param usedPoint point used from selected Point for discount
 * @param additionPoint point the members get after transaction
 */
export const updateMemberPointAfterTransactionWithDiscount = async ( id: string, currentPoint: number, usedPoint: number, additionPoint: number ) => {
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

/**
 * update member's total_point value after transaction without discount
 * @param id member id
 * @param additionPoint point the members get after transaction
 */
export const updateMemberPointAfterTransactionWithoutDiscount = async ( id: string, currentPoint: number, additionPoint: number ) => {
    try {
        const totalPoint = currentPoint + additionPoint
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

export const getMembersTotalTransaction = async (memberId: string) => {
    try {
        const data = await db.transactions.count({
            where: {
                customerId: memberId
            }
        })
        return data
    } catch(err) {
        console.log(err)
        return null
    }
}

export const getMembersTotalPointsUsed = async (memberId: string) => {
    try {
        const data = await db.transactions.findMany({
            where: {
                customerId: memberId
            },
            include: {
                point: {
                    select: { minimum: true }
                }
            }
        })
        return data
    } catch(err) {
        console.log(err)
        return null
    }
}

export const getMembersTotalMoneySaved = async (memberId: string) => {
    try {
        const data = await db.transactions.aggregate({
            where: {
                customerId: memberId
            }, 
            _sum: {
                totalDiscount: true
            }
        })
        return data
    } catch(err) {
        console.log(err)
        return null
    }
}

export const getMembersTransaction = async (memberId: string) => {
    try {
        const data = await db.transactions.findMany({
            where: {
                customerId: memberId
            }, 
            include: {
                stylist: {
                    select: { name: true }
                }, 
                transactionDetails: {
                    include: {
                        treatment: { select: { name: true } }
                    }
                }
            },
            take: 10,
            skip: 0,
            orderBy: {
                createdAt: 'desc'
            }
        })
        return data
    } catch(err) {
        console.log(err)
        return null
    }
}

export const getTotalMember = async () => {
    try {
        const data = await db.customers.count()
        return data
    } catch(err) {
        console.log(err)
        return null
    }
}

export const getCustomerAllTransactionsWithPagination = async (customerId: string, skip = 0, take = 10) => {
    try {
        const transactions = await db.transactions.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                customer: {
                    select: {
                        id: true,
                        name: true,
                        total_point: true,
                        phone: true
                    }
                },
                stylist: {
                    select: {
                        id: true,
                        name: true,
                        code: true,
                        email: true
                    }
                },
                point: {
                    select: {
                        id: true,
                        name: true,
                        minimum: true,
                        discount: true
                    }
                },
                transactionDetails: {
                    include: {
                        treatment: true
                    }
                },
            },
            skip: skip,
            take: take,
            where: {
                customerId: customerId
            }
        })
        return transactions
    } catch(err) {
        console.log(err)
        return null
    }
} 

/**
 * update member point first (current member total point + used point in transaction - gathered point from this transaction)
 */
export const updateMemberPointBeforeTransactionDeletedOrUpdated = async ( customer: Customers, point: Points | null, currentTotalPoint: number ) => {
    try {
        let newTotalPoint = customer.total_point
        if(point != null) { newTotalPoint += point.minimum }
        newTotalPoint -= currentTotalPoint
        if(newTotalPoint < 0) newTotalPoint = 0
        const data = await db.customers.update({
            where: {
                id: customer.id
            },
            data: {
                total_point: newTotalPoint
            }
        })
        return data
    } catch(err) {
        console.log(err)
        return null
    }
}

