import { PrismaClient } from '../generated/prisma/client.js'

export const db = new PrismaClient()

export * from '../generated/prisma/index.js'
