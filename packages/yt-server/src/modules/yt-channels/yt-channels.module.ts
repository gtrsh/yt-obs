import { Module } from '@nestjs/common'
import { BullModule } from '@nestjs/bullmq'
import { ConfigService } from '@nestjs/config'

import { ChannelController } from './yt-channels.controller.js'
import { ChannelService } from './yt-channels.service.js'

import {
  QUEUE_CHANNEL_CREATE,
  QUEUE_CHANNEL_UPDATE,
} from '../../core/constants.js'

@Module({
  imports: [
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        connection: {
          host: config.get('YTOBS_BULL_HOST'),
          port: config.get('YTOBS_BULL_PORT'),
        },
      }),
    }),
    BullModule.registerQueue({ name: QUEUE_CHANNEL_CREATE }),
    BullModule.registerQueue({ name: QUEUE_CHANNEL_UPDATE }),
  ],
  controllers: [ChannelController],
  providers: [ChannelService]
})
export class YtChannelsModule {}
