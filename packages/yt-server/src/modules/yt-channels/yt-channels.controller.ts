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

  @Get()
  @Roles(Role.USER)
  async findAll(
    @Req() req,
    @Query('status') status?: ChannelStatus
  ) {
    const userId = req.user.sub as string

    return this.channelService.findAll(userId, status)
  }
}
