import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { PrismaModule } from '../index.js'
import { jwt } from './constants.js'

import { AuthenticateService } from './authenticate.service.js'
import { AuthenticateController } from './authenticate.controller.js'

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
  providers: [AuthenticateService],
  controllers: [AuthenticateController]
})
export class AuthenticateModule {}
