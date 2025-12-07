export const jwt = {
  secret: process.env.YTOBS_JWT_SECRET,
  expires: '24h'
}

if (!jwt.secret) {
  throw new Error('Jwt secret is empty')
}
