import { envSchema } from './env.validation.js'
import { getYtDlpBinary, getNodeBinary } from './binary-path.config.js'

const DEV_ENV_FILES = ['.env.example', '../../.env.example']
export const envConfig = {
  isGlobal: true,
  envFilePath: DEV_ENV_FILES,
  load: [getYtDlpBinary, getNodeBinary],
  validate: (config) => {
    const configContainer = envSchema.safeParse(config)

    if (!configContainer.success) {
      throw new Error(`Config validation failed:\n${configContainer.error.message}`)
    }

    return configContainer.data
  }
}
