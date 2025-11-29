import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common'

import { AuthenticateService } from './authenticate.service.js'

@Controller({ path: 'auth', version: '1' })
export class AuthenticateController {
  constructor(
    private authService: AuthenticateService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  post(@Body() body: { username: string, password: string }) {
    const { username, password } = body

    return this.authService.login(username, password)
  }
}
