import { z } from 'zod/v4'

const PlaylistVariantsSchema = z.enum(['videos', 'shorts'])

const YoutubeChannelUrlSchema = z
  .url()
  .refine(
    (url) => /^https:\/\/www\.youtube\.com\/@[\w.-]+$/.test(url),
    { message: 'URL must be a valid YouTube channel handle' }
  )

const YoutubeChannelSchema = z.object({
  url: YoutubeChannelUrlSchema,
  type: PlaylistVariantsSchema.default('videos').optional()
})

export {
  PlaylistVariantsSchema,
  YoutubeChannelUrlSchema,
  YoutubeChannelSchema,
}
