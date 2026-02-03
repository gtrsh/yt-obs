import { z } from 'zod/v4'

// TODO: add shorts/playlist/live types later only videos for now
const PlaylistVariantsSchema = z.enum(['videos'])

const YoutubeChannelUrlSchema = z
  .url()
  .refine(
    (url) => /^https:\/\/www\.youtube\.com\/@[\w.-]+$/.test(url),
    { message: 'URL must be a valid YouTube channel handle' }
  )

const YoutubeChannelSchema = z.object({
  url: YoutubeChannelUrlSchema,
  playlistType: PlaylistVariantsSchema.default('videos').optional()
})

export type YoutubeChannel = z.infer<typeof YoutubeChannelSchema>
export {
  PlaylistVariantsSchema,
  YoutubeChannelUrlSchema,
  YoutubeChannelSchema,
}
