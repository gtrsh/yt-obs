import { envSchema } from './env.validation.js'

const DEV_ENV_FILES = ['.env.example', '../../.env.example']
export const envConfig = {
  isGlobal: true,
  envFilePath: DEV_ENV_FILES,
  validate: (config) => {
    const configContainer = envSchema.safeParse(config)

    if (!configContainer.success) {
      throw new Error(`Config validation failed:\n${configContainer.error.message}`)
    }

    return configContainer.data
  }
}
