import { PrismaClient, PrismaPg } from '@yt-obs/store-sql'

const adapter = new PrismaPg({
  connectionString: process.env.YTOBS_STORE_PG as string,
})

const client = new PrismaClient({ adapter, log: ['query'] })

// const channels = await client.channel.findFirst({
//   include: {
//     channelInfo: {
//       select: {
//         info: true
//       }
//     }
//   }
// })
// console.log(channels)

await client.$disconnect()
