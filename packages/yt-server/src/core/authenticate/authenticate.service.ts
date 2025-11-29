import bcrypt from 'bcrypt'

import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { PrismaService } from '../index.js'

@Injectable()
export class AuthenticateService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(username: string, password: string) {
    const user = await this.prismaService.user.findUnique({
      where: { name: username }
    })

    if (!user) {
      throw new UnauthorizedException()
    }

    const { password: passwordHash, id, ...userData } = user
    const compareUserPass = await bcrypt.compare(password, passwordHash)

    if (!compareUserPass) {
      throw new UnauthorizedException()
    }

    const payload = { sub: id, userData }
    return {
      access_token: await this.jwtService.signAsync(payload)
    }
  }
}
