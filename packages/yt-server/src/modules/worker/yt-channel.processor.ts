import { Processor, WorkerHost, InjectQueue } from '@nestjs/bullmq'
import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Job, Queue } from 'bullmq'
import { execa } from 'execa'

import { PrismaService } from '../../core/index.js'
import { QUEUE_CHANNEL } from '../../core/constants.js'

@Processor(QUEUE_CHANNEL)
export class ChannelProcessor extends WorkerHost {
  private readonly logger = new Logger(ChannelProcessor.name)

  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {
    super()
  }

  async process(job: Job) {
    const { url, type: playlistType } = job.data

    this.logger.log(`Processing channel: ${url}`)
    this.logger.log(job.data)

    try {
      const ytdlpBin = this.config.get<string>('ytdlp-bin')!
      const nodejsBin = this.config.get<string>('nodejs-bin')!

      this.logger.log('Current bins path')
      this.logger.log(ytdlpBin)
      this.logger.log(nodejsBin)

      const result = await execa(ytdlpBin, [
        '--dump-single-json',
        '--flat-playlist',
        '--extractor-args', 'youtube:lang=ru',
        '--js-runtimes', `node:${nodejsBin}`,
        `${url}/${playlistType}`,
      ])

      const ytdlpData = JSON.parse(result.stdout)
      const { entries: channelVideos, ...channelInfo } = ytdlpData

      const { id } = await this.prisma.channel.create({
        data: {
          url, data_type: playlistType, info: channelInfo, data: channelVideos,
        }
      })

      this.logger.log(`Data channel processing complete: ${id}`)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err)
      this.logger.error(message)
    }
  }
}
