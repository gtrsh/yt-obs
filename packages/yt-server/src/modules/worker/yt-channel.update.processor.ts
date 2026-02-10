import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq'
import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Job } from 'bullmq'
import { execa } from 'execa'
import { TaskStatus, ChannelStatus } from '@yt-obs/store-sql'

import { PrismaService } from '../../core/index.js'
import { QUEUE_CHANNEL_UPDATE } from '../../core/constants.js'

@Processor(QUEUE_CHANNEL_UPDATE)
export class ChannelUpdateProcessor extends WorkerHost {
  private readonly logger = new Logger(ChannelUpdateProcessor.name)

  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {
    super()
  }

  async process(job: Job) {
    const { url, channelId, channelTaskId, channelDataId, channelDataCurrentId } = job.data

    this.logger.log(`Start updating channel: ${url}`)
    await this.prisma.channelTask.update({
      where: { id: channelTaskId },
      data: { status: TaskStatus.PROCESSING },
    })

    try {
      const ytdlpBin = this.config.get<string>('ytdlp-bin')!
      const nodejsBin = this.config.get<string>('nodejs-bin')!

      // TODO: unify yt-dlp run in processors (crete standalone module), duplicate for now
      const result = await execa(ytdlpBin, [
        '--dump-single-json',
        '--flat-playlist',
        '--extractor-args', 'youtube:lang=ru',
        '--js-runtimes', `node:${nodejsBin}`,
        `${url}`,
      ], { reject: false })

      if (result.exitCode === 0) {
        const ytdlpData = JSON.parse(result.stdout)
        const { entries: channelVideos } = ytdlpData

        await this.prisma.$transaction(async (tx) => {
          await tx.channelData.update({
            where: { id: channelDataCurrentId },
            data: {
              isCurrent: false,
              updatedAt: new Date(),
            }
          })

          await tx.channelData.update({
            where: { id: channelDataId },
            data: {
              data: channelVideos,
              isCurrent: true,
              updatedAt: new Date(),
            }
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
            data: {
              status: ChannelStatus.ACTIVE,
              updatedAt: new Date,
            },
          })

          this.logger.log(`Complete channel updating [SUCCESS]: ${url}`)
        })
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

          await tx.channelData.update({
            where: { id: channelDataCurrentId },
            data: {
              isCurrent: true,
              updatedAt: new Date(),
            }
          })

          await tx.channel.update({
            where: { id: channelId },
            data: {
              status: ChannelStatus.ACTIVE,
              updatedAt: new Date(),
            },
          })

          this.logger.log(`Update channel failed revert to previous state: ${url}`)
        })
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

        await tx.channelData.update({
          where: { id: channelDataCurrentId },
          data: {
            isCurrent: true,
            updatedAt: new Date(),
          }
        })

        await tx.channel.update({
          where: { id: channelId },
          data: {
            status: ChannelStatus.ACTIVE,
            updatedAt: new Date(),
          },
        })
      })

      this.logger.error(`Failed channel data update: ${url}`)
    }
  }

  @OnWorkerEvent('failed')
  async handler(job: Job) {
    this.logger.log('Task CHANNEL_UPDATE failed:')
    this.logger.log(job.id)
    this.logger.log(job.data)
  }
}
