import { Queue } from 'bullmq'

const connection = {
  host: process.env.YTOBS_BULL_HOST,
  port: Number(process.env.YTOBS_BULL_PORT),
}

const queue = new Queue('QUEUE_CHANNEL', { connection })

const url = process.argv.at(2)

if (!url) {
  console.error('Usage: tsx add-channel.ts <url>')
  process.exit(1)
}

await queue.add('channel', { url, type: 'videos' })

console.log(`Added job with url: ${url}`)

await queue.close()
