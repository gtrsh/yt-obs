import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { LoggerModule } from 'pino-nestjs'

import { AuthenticationModule } from './core/index.js'
import { PrismaModule } from './core/index.js'
import { envConfig } from './core/config/env.config.js'
import { loggerConfig } from './core/config/logger.config.js'

import { YtChannelsModule } from './modules/index.js'

@Module({
  imports: [
    AuthenticationModule,
    ConfigModule.forRoot(envConfig),
    PrismaModule,
    LoggerModule.forRoot(loggerConfig),
    YtChannelsModule,
  ],
})
export class AppModule {}
