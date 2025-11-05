import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { Logger } from 'pino-nestjs'

import { AppModule } from './app.module.js'

const bootstrap = async () => {
  const fastifyAdapter = new FastifyAdapter()

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter,
    { bufferLogs: true },
  )
  app.useLogger(app.get(Logger))

  await app.listen(process.env.PORT ?? 3000)

  process.on('SIGINT', async () => await app.close())
  process.on('SIGHUP', async () => await app.close())
}

void bootstrap()
