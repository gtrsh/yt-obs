import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service.js'

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): unknown {
    return this.appService.getHello()
  }
}
