import { Processor, WorkerHost } from '@nestjs/bullmq'
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

  async process(job: Job) {}
}
