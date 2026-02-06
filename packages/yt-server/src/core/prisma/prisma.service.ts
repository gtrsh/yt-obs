import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common'
import { PrismaClient, PrismaPg } from '@yt-obs/store-sql'

const DELETED_AT_FIELD = { deletedAt: true }
const OMMIT_MODELS = {
  user: { ...DELETED_AT_FIELD },
  channel: { ...DELETED_AT_FIELD },
  channelInfo: { ...DELETED_AT_FIELD },
  channelData: { ...DELETED_AT_FIELD },
  channelTask: { ...DELETED_AT_FIELD },
}

@Injectable()
class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    const adapter = new PrismaPg({
      connectionString: process.env.YTOBS_STORE_PG as string,
    });
    super({
      adapter,
      omit: OMMIT_MODELS,
    });
  }

  async onModuleInit() {
    await this.$connect()
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }
}

export {
  PrismaService,
}
