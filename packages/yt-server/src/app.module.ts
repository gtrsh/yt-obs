import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { LoggerModule } from 'pino-nestjs'

import { AuthenticationModule } from './core/index.js'
import { PrismaModule } from './core/index.js'
import { envConfig } from './core/config/env.config.js'

import { AppController } from './app.controller.js'
import { AppService } from './app.service.js'

@Module({
  imports: [
    AuthenticationModule,
    ConfigModule.forRoot(envConfig),
    PrismaModule,
    LoggerModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
