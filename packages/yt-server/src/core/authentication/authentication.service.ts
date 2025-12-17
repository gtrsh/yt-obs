import bcrypt from 'bcrypt'

import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

import { PrismaService } from '../index.js'

@Injectable()
export class AuthenticationService {
  constructor(
    private configService: ConfigService,
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
    const compareUserPass = await bcrypt.compare(password.concat(this.salt), passwordHash)

    if (!compareUserPass) {
      throw new UnauthorizedException()
    }

    const payload = { sub: id, ...userData }
    return {
      access_token: await this.jwtService.signAsync(payload)
    }
  }

  async signup(username: string, password: string) {
    const passwordHash = await bcrypt.hash(password.concat(this.salt), this.hashRounds)
    const user = await this.prismaService.user.create({
      data: {
        name: username,
        password: passwordHash,
      },
      omit: { password: true },
    })

    return user
  }

  get salt() {
    return this.configService.get('YTOBS_SALT')
  }

  get hashRounds() {
    return this.configService.get('YTOBS_HASH_ROUND')
  }
}
