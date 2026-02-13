import ky from 'ky'
import { getToken } from '../lib/auth.ts'

export const api = ky.create({
  prefixUrl: '/api/v1',
  hooks: {
    beforeRequest: [
      (request) => {
        const token = getToken()
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`)
        }
      },
    ],
  },
})
