import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { Role } from '@yt-obs/store-sql'
import { ROLES_KEY } from './authorization.decorator.js'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<Role[]>(
      ROLES_KEY,
      context.getHandler()
    ) ?? []

    console.log(roles)

    const request = context.switchToHttp().getRequest()
    const user = request.user

    if (user.role === Role.ADMIN) {
      return true
    }

    return roles.some((role) => user.role === role)
  }
}
