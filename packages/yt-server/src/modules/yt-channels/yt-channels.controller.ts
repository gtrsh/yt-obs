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
import { Role } from '@yt-obs/store-sql'

import { Roles } from '../../core/decorators.js'
import { YoutubeChannelSchema } from '../../core/schemas/yt-channel.schema.js'
import { ZodValidationPipe } from '../../core/pipes/zod-validation.pipe.js'

import type { YoutubeChannel } from '../../core/schemas/yt-channel.schema.js'

@Controller({ path: 'channel', version: '1' })
export class ChannelController {
  constructor(

  ) {}

  @Post()
  @Roles(Role.USER)
  async create(
    @Body(new ZodValidationPipe(YoutubeChannelSchema)) body: YoutubeChannel,
    @Req() req,
  ) {
    const userId = req.user.sub as string

    return { userId }
  }
}
