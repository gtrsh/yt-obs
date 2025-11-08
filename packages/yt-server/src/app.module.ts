import { Module } from '@nestjs/common'
import { LoggerModule } from 'pino-nestjs'

import { PrismaModule } from './core/index.js'

import { AppController } from './app.controller.js'
import { AppService } from './app.service.js'

@Module({
  imports: [
    PrismaModule,
    LoggerModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
