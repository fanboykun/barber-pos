import db from "../utils/prisma"

export const getAllTreatments = async() => {
    try {
        const treatments = await db.treatments.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })
        return treatments
    } catch(err) {
        console.log(err)
        return null
    }
}

export const getTreatmentById = async(id: string) => {
    try {
        const treatment = await db.treatments.findUnique({
            where: {
                id: id
            }
        })
        return treatment
    } catch(err) {
        console.log(err)
        return null
    }
}

export const deleteTreatmentById = async(id: string) => {
    try {
        await db.treatments.delete({
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

export const addTreatment = async(name: string, price: number, sub_service: string|undefined, point: number) => {
    try{
        const newTreatment = await db.treatments.create({
            data: {
                name: name,
                price: price,
                sub_service: sub_service,
                point: point
            }
        })
        return newTreatment
    } catch(err) {
        console.log(err)
        return null
    }
}

export const updateTreatments = async(id: string, name: string, price: number, sub_service: string|undefined, point: number) => {
    try{
        const updatedTreatment = await db.treatments.update({
            where: {
                id: id
            },
            data: {
                name: name,
                price: price,
                sub_service: sub_service,
                point: point
            }
        })
        return updatedTreatment
    } catch(err) {
        console.log(err)
        return null
    }
}