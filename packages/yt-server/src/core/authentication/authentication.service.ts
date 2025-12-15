import bcrypt from 'bcrypt'

import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { PrismaService } from '../index.js'

const salt = "SALT-DEV" // TODO: Get from .env file
const rounds = Number("10") // TODO: Also get from .env file, string for now cause be parsed from .env

@Injectable()
export class AuthenticationService {
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
    const compareUserPass = await bcrypt.compare(password.concat(salt), passwordHash)

    if (!compareUserPass) {
      throw new UnauthorizedException()
    }

    const payload = { sub: id, ...userData }
    return {
      access_token: await this.jwtService.signAsync(payload)
    }
  }

  async signup(username: string, password: string) {
    const passwordHash = await bcrypt.hash(password.concat(salt), rounds)
    const user = await this.prismaService.user.create({
      data: {
        name: username,
        password: passwordHash,
      },
      omit: { password: true },
    })

    return user
  }
}
