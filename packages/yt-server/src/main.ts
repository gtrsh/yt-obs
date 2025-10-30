import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'

import { AppModule } from './app.module.js'

const bootstrap = async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { bufferLogs: true },
  )

  await app.listen(process.env.PORT ?? 3000)

  process.on('SIGINT', async () => await app.close())
  process.on('SIGHUP', async () => await app.close())
}

void bootstrap()
