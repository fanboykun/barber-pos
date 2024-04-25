import db from "../utils/prisma"

export const getAllPoints = async() => {
    try {
        const data = await db.points.findMany({
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

export const getPointById = async(id: string) => {
    try {
        const data = await db.points.findUnique({
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

export const deletePointById = async(id: string) => {
    try {
        await db.points.delete({
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

export const addPoint = async(name: string, minimum: number, discount: number) => {
    try{
        const newPoint = await db.points.create({
            data: {
                name: name,
                minimum: minimum,
                discount: discount
            }
        })
        return newPoint
    } catch(err) {
        console.log(err)
        return null
    }
}

export const updatePoint = async(id: string, name: string, minimum: number, discount: number) => {
    try{
        const updatedPoint = await db.points.update({
            where: {
                id: id
            },
            data: {
                name: name,
                minimum: minimum,
                discount: discount
            }
        })
        return updatedPoint
    } catch(err) {
        console.log(err)
        return null
    }
}