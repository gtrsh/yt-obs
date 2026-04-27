import { RequestMethod } from '@nestjs/common'

export const loggerConfig = {
  forRoutes: [{ method: RequestMethod.ALL, path: '*splat' }],
  pinoHttp: {
    redact: {
      paths: ['req.headers.authorization'],
    },
  },
}
