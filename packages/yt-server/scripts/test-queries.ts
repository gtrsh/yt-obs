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

// const userId = process.argv.at(2)
// const channels = await client.userChannel.findMany({
//   where: { userId },
//   include: { channel: true }
// })
// console.log(channels)
// console.log(channels.map(({ channel }) => channel))

// const userId = process.argv.at(2)
// const channelId = process.argv.at(3)
//
// const data = await client.channelInfo.findFirst({
//   select: { info: true },
//   where: {
//     channel: {
//       id: channelId,
//       users: {
//         some: {
//           userId
//         }
//       }
//     }
//   }
// })
// console.log(data)
// const info = data?.info ?? null
// console.log(info)

// const userId = process.argv.at(2)
// const channelId = process.argv.at(3)
//
// const data = await client.channelData.findFirst({
//   select: { id: true, data: true, playlistType: true, createdAt: true, updatedAt: true },
//   where: {
//     isCurrent: true,
//     channel: {
//       id: channelId,
//       users: {
//         some: {
//           userId
//         }
//       }
//     }
//   }
// })
// console.log(data)

await client.$disconnect()
