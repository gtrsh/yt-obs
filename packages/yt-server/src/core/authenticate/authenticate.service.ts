import bcrypt from 'bcrypt'

import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PrismaService } from '../index.js'

@Injectable()
export class AuthenticateService {
  constructor(
    private prismaService: PrismaService,
  ) {}

  async login(username: string, password: string) {
    const user = await this.prismaService.user.findUnique({
      where: { name: username }
    })

    if (!user) {
      throw new UnauthorizedException()
    }

    const { password: passwordHash, ...userData } = user
    const compareUserPass = await bcrypt.compare(password, passwordHash)

    if (!compareUserPass) {
      throw new UnauthorizedException()
    }

    return userData
  }
}
