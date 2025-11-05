import { Injectable, Logger } from '@nestjs/common'
import { PrismaClient, User } from '@yt-obs/store-sql'

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name)

  async getHello(): Promise<User[]> {
    const db = new PrismaClient()
    const data = await db.user.findMany({})
    await db.$disconnect()

    this.logger.log('service log')
    return data
  }
}
