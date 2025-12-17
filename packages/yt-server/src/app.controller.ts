import { Controller, Get } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Role } from '@yt-obs/store-sql'

import { AppService } from './app.service.js'
import { Roles } from './core/decorators.js'

// Test purpose controller
// TODO: remove
@Controller({ path: 'service', version: '1' })
export class AppController {
  constructor(
    private configService: ConfigService,
    private readonly appService: AppService
  ) {}

  @Get()
  getHello(): unknown {
    const binYt = this.configService.get('ytdlp-bin')
    const binNode = this.configService.get('nodejs-bin')
    // return [binNode, binYt]

    return this.appService.getHello()
  }

  @Get('user')
  @Roles(Role.USER)
  getHelloUser(): unknown {
    return this.appService.getHello()
  }
}
