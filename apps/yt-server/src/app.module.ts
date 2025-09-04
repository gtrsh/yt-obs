import { db } from '@yt-obs/store-sql'
import { User } from '@yt-obs/store-sql'
import { Module, Injectable, Controller, Get } from '@nestjs/common'

@Injectable()
export class AppService {
  async getHello(): Promise<User[]> {
    return db.user.findMany({})
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
