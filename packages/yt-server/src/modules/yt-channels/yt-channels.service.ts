import { Injectable, Logger } from '@nestjs/common'
import { InjectQueue } from '@nestjs/bullmq'
import { Queue } from 'bullmq'
import { TaskType, ChannelStatus } from '@yt-obs/store-sql'

import { PrismaService } from '../../core/index.js'
import { QUEUE_CHANNEL_CREATE } from '../../core/constants.js'

@Injectable()
export class ChannelService {
  private readonly logger = new Logger(ChannelService.name)

  constructor(
    private prisma: PrismaService,
    @InjectQueue(QUEUE_CHANNEL_CREATE) private channelQueueCreate: Queue,
  ) {}

  async create(channelInfoProps, userId) {
    const { url, playlistType } = channelInfoProps

    const existChannel = await this.prisma.channel.findUnique({
      where: { url },
    })

    if (existChannel) {
      await this.prisma.userChannel.upsert({
        where: { userId_channelId: { userId, channelId: existChannel.id }},
        create: { userId, channelId: existChannel.id},
        update: {},
      })

      return { channel: existChannel, created: false }
    }

    const channel = await this.prisma.$transaction(async (tx) => {
      const newChannel = await tx.channel.create({
        data: { url }
      })

      const channelTask = await tx.channelTask.create({
        data: {
          type: TaskType.CREATE,
          channelId: newChannel.id
        }
      })

      const channelData = await tx.channelData.create({
        data: {
          taskId: channelTask.id,
          channelId: newChannel.id,
          playlistType,
        }
      })

      const channelInfo = await tx.channelInfo.create({
        data: {
          channelId: newChannel.id,
        }
      })

      await tx.userChannel.create({
        data: {
          userId,
          channelId: newChannel.id,
        }
      })

      await this.channelQueueCreate.add('channel-create', {
        url: `${url}/${playlistType}`,
        channelId: newChannel.id,
        channelTaskId: channelTask.id,
        channelDataId: channelData.id,
        channelInfoId: channelInfo.id,
      })

      return newChannel
    })

    return {
      channel,
      created: true,
    }
  }

  async update() {}

  async findAll(userId: string, status?: ChannelStatus) {
    const data = await this.prisma.userChannel.findMany({
      where: { userId },
      include: { channel: true },
    })

    if (status) {
      return data
        .map(({ channel }) => channel)
        .filter((channel) => channel.status === status)
    }

    return data.map(({ channel }) => channel)
  }

  async findById(channelId: string, userId: string) {
    const data = await this.prisma.channelInfo.findFirst({
      where: {
        channel: {
          id: channelId,
          users: { some: { userId } },
        },
      },
    })

    return data?.info ?? null
  }

  async findDataAll() {}

  async findDataById() {}
}
