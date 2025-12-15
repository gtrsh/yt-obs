import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { Role } from '@yt-obs/store-sql'
import { ROLES_KEY, PUBLIC_ROLE_KEY } from './authorization.decorator.js'

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
    const publicRole = this.reflector.getAllAndOverride<boolean>(PUBLIC_ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (publicRole) {
      return true
    }

    const request = context.switchToHttp().getRequest()
    const user = request.user

    if (user.role === Role.ADMIN) {
      return true
    }

    return roles.some((role) => user.role === role)
  }
}
