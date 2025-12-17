import { z } from 'zod'

export const envSchema = z.object({
  YTOBS_SALT: z.string().min(5),
  YTOBS_HASH_ROUND: z.coerce.number(),
  YTOBS_JWT_SECRET: z.string().min(5),
  YTOBS_JWT_EXPIRES: z.string(),
  YTOBS_STORE_PG: z.string(),
  YTOBS_STORE_REDIS_HOST: z.string(),
  YTOBS_STORE_REDIS_PORT: z.coerce.number(),
  YTOBS_BULL_HOST: z.string(),
  YTOBS_BULL_PORT: z.coerce.number(),
})

export type EnvConfig = z.infer<typeof envSchema>
