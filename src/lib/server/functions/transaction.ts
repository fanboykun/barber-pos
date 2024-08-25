import db from "../utils/prisma"

export type TransactionFormDataValidated = {
    stylistId: string,
    customerId: string,    // must be nullable, for now let this be required, pls update the db schema
    treatmentId: string,
    pointId: string|null,
    normalPrice: number,
    totalDiscount: number,
    totalPrice: number,
    totalPoint: number
}

export const getAllTransactions = async() => {
    try {
        const transactions = await db.transactions.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                customer: true,
                stylist: true,
                point: true,
                transactionDetails: {
                    include: {
                        treatment: true
                    }
                },
            }
        })
        return transactions
    } catch(err) {
        console.log(err)
        return null
    }
}

export const getAllTransactionsWithPagination = async (skip = 0, take = 10) => {
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
        })
        return transactions
    } catch(err) {
        console.log(err)
        return null
    }
}


export const getTransactionsCount = async () => {
    try {
        const data = await db.transactions.count()
        return data
    } catch(err) {
        console.log(err)
        return null
    }
}

export const getTransactionById = async(id: string) => {
    try {
        const transaction = await db.transactions.findUnique({
            where: {
                id: id
            },
            include: {
                customer: true,
                stylist: true,
                point: true,
                transactionDetails: {
                    include: { treatment: true }
                },
            }
        })
        return transaction
    } catch(err) {
        console.log(err)
        return null
    }
}

export const deleteTransactionById = async(id: string) => {
    try {
        await db.transactions.delete({
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


export const addTransaction = async ( data: TransactionFormDataValidated ) => {
    try {
        const transaction = await db.transactions.create({
            data: {
                stylistId: data.stylistId,
                customerId: data.customerId,
                pointId: data.pointId,
                totalDiscount: data.totalDiscount,
                totalPrice: data.totalPrice,
                totalPoint: data.totalPoint,
                transactionDetails: {
                    create: {
                        treatmentId: data.treatmentId
                    }
                }
            }
        })
        if(!transaction) return null
        return transaction
    } catch(err) {
        console.log(err)
        return null
    }
}

export const updateTransaction = async ( data: TransactionFormDataValidated  & { transactionId: string } ) => {
    try {
        const transaction = await db.transactions.update({
            data: {
                stylistId: data.stylistId,
                customerId: data.customerId,
                pointId: data.pointId,
                totalDiscount: data.totalDiscount,
                totalPrice: data.totalPrice,
                totalPoint: data.totalPoint,
            },
            where: { id: data.transactionId },
            include: {
                // transactionDetails: { include: { treatment: true } },
                customer: true,
                point: true
            }
        })
        if(!transaction) return null
        return transaction
    } catch(err) {
        console.log(err)
        return null
    }
}

export const updateTransactionDetailTreatment = async (id: string, treatmentId: string) => {
    try{
        const transactionDetail = await db.transactionDetails.update({
            data: {
                treatmentId: treatmentId,
            },
            where: { id: id }
        })
        return transactionDetail
    } catch(err) {
        console.log(err)
        return null
    }
}

export const getTotalRevenue = async () => {
    try {
        const data = await db.transactions.aggregate({
            _sum: {
                totalPrice: true
            }
        })  
        return data
    } catch(err) {
        console.log(err)
        return null
    }
}
