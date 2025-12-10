import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'

import { PrismaModule } from '../index.js'
import { jwt } from './constants.js'

import { AuthenticationService } from './authentication.service.js'
import { AuthenticationController } from './authentication.controller.js'
import { AuthGuard } from './authentication.guard.js'
import { RolesGuard } from './authorization.guard.js'

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
    AuthenticationService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    }
  ],
  controllers: [AuthenticationController]
})
export class AuthenticationModule {}
