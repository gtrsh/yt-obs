import { Controller, Get } from '@nestjs/common'
import { Role } from '@yt-obs/store-sql'

import { AppService } from './app.service.js'
import { Roles } from './core/decorators.js'

// Test purpose controller
// TODO: remove
@Controller({ path: 'service', version: '1' })
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): unknown {
    return this.appService.getHello()
  }

  @Get('user')
  @Roles(Role.USER)
  getHelloUser(): unknown {
    return this.appService.getHello()
  }
}
