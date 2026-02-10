import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq'
import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Job } from 'bullmq'
import { execa } from 'execa'
import { TaskStatus, ChannelStatus } from '@yt-obs/store-sql'

import { PrismaService } from '../../core/index.js'
import { QUEUE_CHANNEL_CREATE } from '../../core/constants.js'

@Processor(QUEUE_CHANNEL_CREATE)
export class ChannelCreateProcessor extends WorkerHost {
  private readonly logger = new Logger(ChannelCreateProcessor.name)

  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {
    super()
  }

  async process(job: Job) {
    const { url, channelId, channelTaskId, channelDataId, channelInfoId } = job.data

    this.logger.log(`Start processing channel: ${url}`)
    await this.prisma.channelTask.update({
      where: { id: channelTaskId },
      data: { status: TaskStatus.PROCESSING },
    })

    try {
      const ytdlpBin = this.config.get<string>('ytdlp-bin')!
      const nodejsBin = this.config.get<string>('nodejs-bin')!

      const result = await execa(ytdlpBin, [
        '--dump-single-json',
        '--flat-playlist',
        '--extractor-args', 'youtube:lang=ru',
        '--js-runtimes', `node:${nodejsBin}`,
        `${url}`,
      ], { reject: false })

      if (result.exitCode === 0) {
        const ytdlpData = JSON.parse(result.stdout)
        const { entries: channelVideos, ...channelInfo } = ytdlpData

        await this.prisma.$transaction(async (tx) => {
          await tx.channelInfo.update({
            where: { id: channelInfoId },
            data: { info: channelInfo },
          })

          await tx.channelData.update({
            where: { id: channelDataId },
            data: { data: channelVideos, isCurrent: true },
          })

          await tx.channelTask.update({
            where: { id: channelTaskId },
            data: {
              status: TaskStatus.COMPLETED,
              completedAt: new Date(),
            },
          })

          await tx.channel.update({
            where: { id: channelId },
            data: { status: ChannelStatus.ACTIVE },
          })
        })

        this.logger.log(`Complete channel processing [SUCCESS]: ${url}`)
      }

      if (result.exitCode != 0) {
        await this.prisma.$transaction(async (tx) => {
          await tx.channelTask.update({
            where: { id: channelTaskId },
            data: {
              status: TaskStatus.FAILED,
              error: result.stderr,
              completedAt: new Date(),
            },
          })

          await tx.channel.update({
            where: { id: channelId },
            data: { status: ChannelStatus.NOT_FOUND },
          })
        })

        this.logger.log(`Complete channel processing [NOT_FOUND]: ${url}`)
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err)

      await this.prisma.$transaction(async (tx) => {
        await tx.channelTask.update({
          where: { id: channelTaskId },
          data: {
            status: TaskStatus.FAILED,
            error: message,
            completedAt: new Date(),
          },
        })

        await tx.channel.update({
          where: { id: channelId },
          data: { status: ChannelStatus.ERROR },
        })
      })

      this.logger.error(`Failed channel processing: ${url}`)
    }
  }

  @OnWorkerEvent('failed')
  async handler(job: Job) {
    this.logger.log('Task CHANNEL_CREATE failed:')
    this.logger.log(job.id)
    this.logger.log(job.data)
  }
}
