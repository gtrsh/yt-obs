import { registerAs } from '@nestjs/config'
import which from 'which'

export const getYtDlpBinary = registerAs(
  'ytdlp-bin',
  async () => await which('yt-dlp')
)

export const getNodeBinary = registerAs(
  'nodejs-bin',
  async () => await which('node')
)
