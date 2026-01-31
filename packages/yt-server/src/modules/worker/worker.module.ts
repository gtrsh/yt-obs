import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { BullModule } from '@nestjs/bullmq'
import { LoggerModule } from 'pino-nestjs'

import { PrismaModule } from '../../core/index.js'
import { envConfig } from '../../core/config/env.config.js'
import { loggerConfig } from '../../core/config/logger.config.js'
import { QUEUE_CHANNEL } from '../../core/constants.js'

import { ChannelProcessor } from './yt-channel.processor.js'

@Module({
  imports: [
    ConfigModule.forRoot(envConfig),
    PrismaModule,
    LoggerModule.forRoot(loggerConfig),
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        connection: {
          host: config.get('YTOBS_BULL_HOST'),
          port: config.get('YTOBS_BULL_PORT'),
        },
      }),
    }),
    BullModule.registerQueue({ name: QUEUE_CHANNEL }),
  ],
  providers: [
    ChannelProcessor,
  ]
})
export class WorkerModule {}
