import type { transactionDetails } from "@prisma/client"
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
                transactionDetails: true,
            }
        })
        return transactions
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
                transactionDetails: true,
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

export const addTransactionForMultipleTreatment = async( treatmentId: string[], customerId: string, pointId: string|null, stylistId: string, totalDiscount:number|null, totalPrice:number, totalPoint:number   ) => {
    try{
        const transaction = await db.transactions.create({
            data: {
                customerId: customerId,
                pointId: pointId,
                stylistId: stylistId,
                totalDiscount: totalDiscount,
                totalPrice: totalPrice,
                totalPoint: totalPoint
            }
        })
        const transactionDetails: Array<transactionDetails|null> = []
        for(let a = 0; a < treatmentId.length; a++) {
            const currentTreatmentId = treatmentId[a]
            const transactionDetail = await addTransactionDetail(transaction.id, currentTreatmentId)
            transactionDetails.push(transactionDetail)
        }
        const fullTransaction = {transaction, transactionDetails}
        return fullTransaction
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
                totalPoint: data.totalPoint
            }
        })
        if(!transaction) return null
        const detail = await db.transactionDetails.create({
            data: {
                transactionId: transaction.id,
                treatmentId: data.treatmentId
            }
        })
        return { transaction, detail }
    } catch(err) {
        console.log(err)
        return null
    }
}

export const updateTreatments = async(  ) => {
    try{
        return true
    } catch(err) {
        console.log(err)
        return null
    }
}

const addTransactionDetail = async (treatmentId: string, transactionId: string) => {
    try{
        const transactionDetail = await db.transactionDetails.create({
            data: {
                treatmentId: treatmentId,
                transactionId: transactionId
            }
        })
        return transactionDetail
    } catch(err) {
        console.log(err)
        return null
    }
}
