import { PrismaClient, PrismaPg } from '@yt-obs/store-sql'

const adapter = new PrismaPg({
  connectionString: process.env.YTOBS_STORE_PG as string,
})

const client = new PrismaClient({ adapter, log: ['query'] })

const users = await client.user.createMany({
  data: [
    { role: 'ADMIN', name: 'admin', password: '$2b$10$oV1rMq6c5XBVtTBoGL4zHeyuY/1YLPcwSln47CAHnkaixp31qWaWK' },
    { role: 'USER', name: 'user', password: '$2b$10$ts0ynpAq.RkdOvOiNUL1gu6uhW7i78QWVyphLadYy/5pDS23V6eFm' },
  ]
})

console.log('Users created')
console.log(users)

client.$disconnect()
