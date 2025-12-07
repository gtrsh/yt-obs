import { Module } from '@nestjs/common'
import { LoggerModule } from 'pino-nestjs'

import { AuthenticationModule } from './core/index.js'
import { PrismaModule } from './core/index.js'

import { AppController } from './app.controller.js'
import { AppService } from './app.service.js'

@Module({
  imports: [
    AuthenticationModule,
    PrismaModule,
    LoggerModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
