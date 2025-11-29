import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'

import { PrismaModule } from '../index.js'
import { jwt } from './constants.js'

import { AuthenticateService } from './authenticate.service.js'
import { AuthenticateController } from './authenticate.controller.js'
import { AuthGuard } from './authenticate.guard.js'

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: jwt.secret,
      signOptions: {
        expiresIn: '1Day',
      },
    })
  ],
  providers: [
    AuthenticateService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [AuthenticateController]
})
export class AuthenticateModule {}
