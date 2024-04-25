import {  PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid';
const prisma = new PrismaClient();
  
  async function main() {
    const insertUser = async() => {

    // equal to password   (the password is password) 
    const hashed_password ='$argon2id$v=19$m=19456,t=2,p=1$G6oiKRT0mp658WXHisgciQ$C4aWthM+QoXp/1gJjakYVqkYK8FL9XfHx91QE3bTlsg'
    const userId = uuid()

      await prisma.user.upsert({
        where: { email: 'admin@gmail.com' },
        update: {
          hashed_password: hashed_password,
        },
        create: {
            id: userId,
            email: 'admin@gmail.com',
            name: 'Sabin Adams',
            role: 'ADMIN',
            hashed_password: hashed_password,
        },
      });
    }

    const insertStylist = async() => {
      const hashed_password ='$argon2id$v=19$m=19456,t=2,p=1$G6oiKRT0mp658WXHisgciQ$C4aWthM+QoXp/1gJjakYVqkYK8FL9XfHx91QE3bTlsg'
      const id = uuid()

      await prisma.user.upsert({
        where: { email: 'stylist@gmail.com' },
        update: {
          hashed_password: hashed_password,
        },
        create: {
            id: id,
            email: 'stylist@gmail.com',
            name: 'Bang Stylist',
            code: 'Stylist-1',
            hashed_password: hashed_password,
        },
      });
    }

    const insertCustomer = async() => {
      const hashed_password ='$argon2id$v=19$m=19456,t=2,p=1$G6oiKRT0mp658WXHisgciQ$C4aWthM+QoXp/1gJjakYVqkYK8FL9XfHx91QE3bTlsg'
      const id = uuid()

      const customersCount = await prisma.customers.count()
      if(customersCount > 0) {
        await prisma.customers.deleteMany()
      }

      await prisma.customers.create({
        data: {
          id: id,
          name: 'Customer',
          password: hashed_password,
          phone: '081312123456',
          total_point: 0
        }
      })
    }

    const insertTreatments = async() => {
      type InitialTreatments = {
          id: string,
          name: string,
          price: number,
          sub_service?: string,
          point: number
      }
      const treatments: InitialTreatments[] = [
        {
          id: uuid(),
          name: 'Treatment-1',
          price: 50000,
          point: 10,
        },
        {
          id: uuid(),
          name: 'Treatment-2',
          price: 55000,
          point: 15,
        },
        {
          id: uuid(),
          name: 'Treatment-3',
          price: 100000,
          sub_service: 'Service-1',
          point: 25,
        }
      ]

      const treatmentsCount = await prisma.treatments.count()
      if(treatmentsCount > 0) {
        await prisma.treatments.deleteMany()
      }

      await prisma.treatments.createMany({
        data: treatments
      })
    }

    const insertPoints = async() => {
      type InitialPoints = {
        id: string,
        name: string,
        minimum: number,
        discount: number
      }
      const points: InitialPoints[] = [
        {
          id: uuid(),
          name: 'Potongan Harga 10%',
          minimum: 25,
          discount: 10
        },
        {
          id: uuid(),
          name: 'Potongan Harga 30%',
          minimum: 50,
          discount: 30
        },
        {
          id: uuid(),
          name: 'Gratis',
          minimum: 100,
          discount: 100
        },
      ]

      const pointsCount = await prisma.points.count()
      if(pointsCount > 0) {
        await prisma.points.deleteMany()
      }

      await prisma.points.createMany({
        data: points
      })
    }

    insertUser()
    insertStylist()
    insertTreatments()
    insertCustomer()
    insertPoints()
  }
  
  // execute the main function
  main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      // close the Prisma Client at the end
      await prisma.$disconnect();
    });