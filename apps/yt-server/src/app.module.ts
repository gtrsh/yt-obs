import { Module, Injectable, Controller, Get } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello(): unknown {
    return { hello: 'world from yt-dlp-api', type: [1, 2, 3, 42, 'a', 'x'] }
  }
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): unknown {
    return this.appService.getHello()
  }
}

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
