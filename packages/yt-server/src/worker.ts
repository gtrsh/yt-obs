import { NestFactory } from '@nestjs/core'
// import { Logger } from 'pino-nestjs'

import { WorkerModule } from './modules/index.js'

const bootstrap = async () => {
  const app = await NestFactory.createApplicationContext(
    WorkerModule,
    // { bufferLogs: true },
  )

  // app.useLogger(app.get(Logger))
  app.enableShutdownHooks()

  process.on('SIGINT', async () => await app.close())
  process.on('SIGHUP', async () => await app.close())
}

void bootstrap()
