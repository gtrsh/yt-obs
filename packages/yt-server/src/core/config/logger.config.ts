export const loggerConfig = {
  pinoHttp: {
    redact: {
      paths: ['req.headers.authorization'],
    },
  },
}
