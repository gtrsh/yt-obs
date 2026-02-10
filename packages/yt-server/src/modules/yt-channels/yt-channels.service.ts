import { Injectable, Logger } from '@nestjs/common'
import { InjectQueue } from '@nestjs/bullmq'
import { Queue } from 'bullmq'
import { TaskType, TaskStatus, ChannelStatus } from '@yt-obs/store-sql'

import { PrismaService } from '../../core/index.js'
import { QUEUE_CHANNEL_CREATE, QUEUE_CHANNEL_UPDATE } from '../../core/constants.js'

@Injectable()
export class ChannelService {
  private readonly logger = new Logger(ChannelService.name)

  constructor(
    private prisma: PrismaService,
    @InjectQueue(QUEUE_CHANNEL_CREATE) private channelQueueCreate: Queue,
    @InjectQueue(QUEUE_CHANNEL_UPDATE) private channelQueueUpdate: Queue,
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

    const {
      newChannel,
      channelTask,
      channelData,
      channelInfo,
    } = await this.prisma.$transaction(async (tx) => {
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

      return {
        newChannel,
        channelTask,
        channelData,
        channelInfo,
      }
    })

    await this.channelQueueCreate.add('channel-create', {
      url: `${url}/${playlistType}`,
      channelId: newChannel.id,
      channelTaskId: channelTask.id,
      channelDataId: channelData.id,
      channelInfoId: channelInfo.id,
    })

    return {
      channel: newChannel,
      created: true,
    }
  }

  async update(channelInfoProps, channelId: string, userId: string) {
    const { playlistType } = channelInfoProps

    const dataDb = await this.prisma.userChannel.findFirst({
      where: { channelId, userId },
      include: { channel: true },
    })

    if (!dataDb) {
      return null
    }
    const { channel } = dataDb

    const activeUpdate = await this.prisma.channelTask.findFirst({
      where: {
        channelId,
        status: { in: [TaskStatus.PROCESSING, TaskStatus.PENDING]},
      }
    })

    if (activeUpdate) {
      return { channel, conflict: true }
    }

    const {
      channelDataCurrentId,
      channelTaskId,
      channelDataId,
    } = await this.prisma.$transaction(async (tx) => {
      await tx.channel.update({
        where: { id: channelId },
        data: {
          status: ChannelStatus.UPDATING,
          updatedAt: new Date(),
        },
      })
      this.logger.log(`Update channel status [UPDATING]: ${channelId}`)

      const channelTask = await tx.channelTask.create({
        data: {
          type: TaskType.UPDATE,
          channelId,
        },
      })
      this.logger.log(`Craeted task for update: ${channelTask.id}`)

      const channelData = await tx.channelData.create({
        data: {
          taskId: channelTask.id,
          channelId,
          playlistType,
        }
      })
      this.logger.log(`Craeted data row for update: ${channelData.id}`)

      const channelDataCurrent = await tx.channelData.findFirst({
        where: {
          channelId,
          isCurrent: true,
        },
        select: { id: true }
      })

      return {
        channelDataCurrentId: channelDataCurrent!.id,
        channelTaskId: channelTask.id,
        channelDataId: channelData.id,
      }
    })

    await this.channelQueueUpdate.add('channel-update', {
      url: `${channel.url}/${playlistType}`,
      channelId,
      channelDataCurrentId,
      channelTaskId,
      channelDataId,
    })

    return { channel, conflict: false }
  }

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

  async findDataAll(channelId: string, userId: string) {
    return this.prisma.channelData.findMany({
      select: {
        id: true, data: true, playlistType: true, createdAt: true, updatedAt: true
      },
      where: {
        channel: {
          id: channelId,
          users: { some: { userId } },
        },
      },
    })
  }

  async findDataById(channelId: string, dataId: string, userId: string) {
    return this.prisma.channelData.findFirst({
      select: {
        id: true, data: true, playlistType: true, createdAt: true, updatedAt: true
      },
      where: {
        id: dataId,
        channel: {
          id: channelId,
          users: { some: { userId } },
        },
      },
    })
  }

  async findDataCurrent(channelId: string, userId: string) {
    return this.prisma.channelData.findFirst({
      select: {
        id: true, data: true, playlistType: true, createdAt: true, updatedAt: true
      },
      where: {
        isCurrent: true,
        channel: {
          id: channelId,
          users: { some: { userId } },
        },
      },
    })
  }

  async findTaskAll(channelId: string, userId: string) {
    return this.prisma.channelTask.findMany({
      select: {
        id: true, type: true, status: true, error: true, createdAt: true, updatedAt: true
      },
      where: {
        channel: {
          id: channelId,
          users: { some: { userId } },
        },
      },
    })
  }

  async findTaskById(channelId: string, taskId: string, userId: string) {
    return this.prisma.channelTask.findFirst({
      select: {
        id: true, type: true, status: true, error: true, createdAt: true, updatedAt: true
      },
      where: {
        id: taskId,
        channel: {
          id: channelId,
          users: { some: { userId } },
        },
      },
    })
  }
}
