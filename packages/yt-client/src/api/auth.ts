import ky from 'ky'

interface LoginResponse {
  access_token: string
}

export async function login(username: string, password: string): Promise<string> {
  const response = await ky.post('/api/v1/auth/login', {
    json: { username, password },
  }).json<LoginResponse>()

  return response.access_token
}
