import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'

import { PrismaModule } from '../index.js'

import { AuthenticationService } from './authentication.service.js'
import { AuthenticationController } from './authentication.controller.js'
import { AuthGuard } from './authentication.guard.js'
import { RolesGuard } from './authorization.guard.js'

@Module({
  imports: [
    PrismaModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('YTOBS_JWT_SECRET'),
        signOptions: {
          expiresIn: config.get('YTOBS_JWT_EXPIRES')
        }
      })
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
