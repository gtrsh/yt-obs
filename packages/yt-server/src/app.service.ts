import { Injectable, Logger } from '@nestjs/common'
import { PrismaService } from './core/index.js'

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name)

  constructor(
    private prismaService: PrismaService,
  ) {}

  async getHello(): Promise<string[]> {

    this.logger.log('service log')
    return ['service', 'response']
  }
}
