import {
  Controller,
  Post,
  Get,
  Param,
  Query,
  Body,
  Req,
  HttpStatus,
  NotFoundException,
  ConflictException,
  Res,
} from '@nestjs/common'
import { Role, ChannelStatus } from '@yt-obs/store-sql'

import { Roles } from '../../core/decorators.js'
import { YoutubeChannelSchema } from '../../core/schemas/yt-channel.schema.js'
import { ZodValidationPipe } from '../../core/pipes/zod-validation.pipe.js'

import { ChannelService } from './yt-channels.service.js'

import type { YoutubeChannel } from '../../core/schemas/yt-channel.schema.js'

@Controller({ path: 'channel', version: '1' })
export class ChannelController {
  constructor(
    private readonly channelService: ChannelService,
  ) {}

  @Post()
  @Roles(Role.USER)
  async create(
    @Body(new ZodValidationPipe(YoutubeChannelSchema)) body: YoutubeChannel,
    @Req() req,
    @Res({ passthrough: true }) res,
  ) {
    const userId = req.user.sub as string
    const { channel, created } = await this.channelService.create(body, userId)

    if (created) {
      res.status(HttpStatus.ACCEPTED)
    } else {
      res.status(HttpStatus.OK)
    }

    return channel
  }

  @Post(':id/update')
  @Roles(Role.USER)
  async update(
    @Req() req,
    @Res({ passthrough: true }) res,
    @Param('id') id: string,
  ) {
    const userId = req.user.sub as string
    const STATIC_PROPS = { playlistType: 'videos' } // TODO: get from body, only video for now

    const channelUpdate = await this.channelService.update(STATIC_PROPS, id, userId)

    if (!channelUpdate) {
      throw new NotFoundException()
    }
    const { channel, conflict } = channelUpdate

    if (conflict) {
      throw new ConflictException({
        message: 'channel tasks in progress',
        channelId: channel.id
      })
    }

    return channel
  }

  @Get()
  @Roles(Role.USER)
  async findAll(
    @Req() req,
    @Query('status') status?: ChannelStatus,
  ) {
    const userId = req.user.sub as string

    return this.channelService.findAll(userId, status)
  }

  @Get(':id')
  @Roles(Role.USER)
  async findById(
    @Req() req,
    @Param('id') id: string,
  ) {
    const userId = req.user.sub as string

    const channelInfo = await this.channelService.findById(id, userId)

    if (!channelInfo) {
      throw new NotFoundException()
    }

    return channelInfo
  }

  @Get(':id/data')
  @Roles(Role.USER)
  async findDataCurrent(
    @Req() req,
    @Param('id') id: string,
  ) {
    const userId = req.user.sub as string

    const channelData = await this.channelService.findDataCurrent(id, userId)

    if (!channelData) {
      throw new NotFoundException()
    }

    return channelData
  }

  @Get(':id/data/history')
  @Roles(Role.USER)
  async findDataAll(
    @Req() req,
    @Param('id') id: string,
  ) {
    const userId = req.user.sub as string

    const channelDataHistory = await this.channelService.findDataAll(id, userId)

    if (!channelDataHistory) {
      throw new NotFoundException()
    }

    return channelDataHistory
  }

  @Get(':id/data/:dataId')
  @Roles(Role.USER)
  async findDataById(
    @Req() req,
    @Param('id') id: string,
    @Param('dataId') dataId: string,
  ) {
    const userId = req.user.sub as string

    const channelDataItem = await this.channelService.findDataById(id, dataId, userId)

    if (!channelDataItem) {
      throw new NotFoundException()
    }

    return channelDataItem
  }

  @Get(':id/task')
  @Roles(Role.USER)
  async findTaskAll(
    @Req() req,
    @Param('id') id: string,
  ) {
    const userId = req.user.sub as string

    const channelTasks = await this.channelService.findTaskAll(id, userId)

    if (!channelTasks) {
      throw new NotFoundException()
    }

    return channelTasks
  }

  @Get(':id/task/:taskId')
  @Roles(Role.USER)
  async findTaskById(
    @Req() req,
    @Param('id') id: string,
    @Param('taskId') taskId: string,
  ) {
    const userId = req.user.sub as string

    const channelTaskItem = await this.channelService.findTaskById(id, taskId ,userId)

    if (!channelTaskItem) {
      throw new NotFoundException()
    }

    return channelTaskItem
  }
}
