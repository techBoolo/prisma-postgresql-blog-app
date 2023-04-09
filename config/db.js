import { PrismaClient } from '@prisma/client'

let prisma
const connectDB = async () => {
  if(process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient()
  } else {
    if(!global.prisma) {
      global.prisma = new PrismaClient()
    }
    prisma = global.prisma
  }
  try {
    await prisma.$connect()
    console.log('Connected to db');
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

export const getDB = () => {
  return prisma
}

export default connectDB
