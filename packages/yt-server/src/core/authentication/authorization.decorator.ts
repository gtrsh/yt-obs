import { SetMetadata } from '@nestjs/common'
import { Role } from '@yt-obs/store-sql'

export const ROLES_KEY = Symbol('ROLES_KEY')
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles)
