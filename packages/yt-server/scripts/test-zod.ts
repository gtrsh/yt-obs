import {
  YoutubeChannelUrlSchema,
  YoutubeChannelSchema
} from '../src/core/schemas/yt-channel.schema.js'

console.log(
  YoutubeChannelUrlSchema.parse(process.argv.at(2))
)
console.log(YoutubeChannelSchema.parse({
  url: 'https://www.youtube.com/@RGB_show',
}))
console.log(YoutubeChannelSchema.parse({
  url: 'https://www.youtube.com/@RGB_show',
  type: 'videos',
}))
console.log(YoutubeChannelSchema.parse({
  url: 'https://www.youtube.com/@RGB_show',
  type: 'shorts',
}))

// Error test
// console.log(YoutubeChannelSchema.parse({
//   url: 'https://www.youtube.com/@RGB_show.123/test',
//   type: 'videosdsf',
// }))
