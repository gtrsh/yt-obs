import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common'

import { AuthenticationService } from './authentication.service.js'
import { Public } from "./authentication.decorator.js"
import { PublicRole } from "./authorization.decorator.js"

@Controller({ path: 'auth', version: '1' })
export class AuthenticationController {
  constructor(
    private authService: AuthenticationService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @PublicRole()
  @Post('login')
  login(@Body() body: { username: string, password: string }) {
    const { username, password } = body

    return this.authService.login(username, password)
  }

  @Public()
  @PublicRole()
  @Post('signup')
  signup(@Body() body: { username: string, password: string }) {
    const { username, password } = body

    return this.authService.signup(username, password)
  }
}
