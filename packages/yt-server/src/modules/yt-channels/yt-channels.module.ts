import { Module } from '@nestjs/common'

import { ChannelController } from './yt-channels.controller.js'

@Module({
  controllers: [ChannelController],
})
export class YtChannelsModule {}
