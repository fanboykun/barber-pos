import db from "../utils/prisma"

export const getAllStylists = async() => {
    try {
        const stylists = await db.user.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            where: {
                role: 'USER'
            }
        })
        return stylists
    } catch(err) {
        console.log(err)
        return null
    }
}

export const getStylistById = async(id: string) => {
    try {
        const stylist = await db.user.findUnique({
            where: {
                id: id,
                role: 'USER'
            }
        })
        return stylist
    } catch(err) {
        console.log(err)
        return null
    }
}

export const deleteStylistById = async(id: string) => {
    try {
        await db.user.delete({
            where: {
                id: id,
                role: 'USER'
            }
        })
        return true
    } catch(err) {
        console.log(err)
        return null
    }
}

export const addStylist = async( name: string, email: string, password: string ) => {
    try{
        const newStylist = await db.user.create({
            data: {
                name: name,
                email: email,
                emailVerifiedAt: new Date(),
                hashed_password: password,
                role: 'USER'
            }
        })
        return newStylist
    } catch(err) {
        console.log(err)
        return null
    }
}

export const updateStylists = async( id: string, name: string, email: string ) => {
    try{
        const updatedStylist = await db.user.update({
            where: {
                id: id,
                role: 'USER'
            },
            data: {
                name: name,
                email: email,
            }
        })
        return updatedStylist
    } catch(err) {
        console.log(err)
        return null
    }
}

export const updateStylistsPassword = async (id:string, password:string) => {
    try{
        const updatedStylist = await db.user.update({
            where: {
                id: id,
                role: 'USER'
            },
            data: {
                hashed_password: password
            }
        })
        return updatedStylist
    } catch(err) {
        console.log(err)
        return null
    }
}

export const getStylistWithTransactionById = async(id: string) => {
    try {
        const stylist = await db.user.findUnique({
            where: {
                id: id,
                role: 'USER',
            },
            include: { transaction: { include: {
                        point: true,
                        customer: true,
                        transactionDetails: { include: { treatment: true } }
            } } }
        })
        return stylist
    } catch(err) {
        console.log(err)
        return null
    }
}
