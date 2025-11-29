import { Module } from '@nestjs/common'

import { PrismaModule } from '../index.js'

import { AuthenticateService } from './authenticate.service.js'
import { AuthenticateController } from './authenticate.controller.js'

@Module({
  imports: [PrismaModule],
  providers: [AuthenticateService],
  controllers: [AuthenticateController]
})
export class AuthenticateModule {}
