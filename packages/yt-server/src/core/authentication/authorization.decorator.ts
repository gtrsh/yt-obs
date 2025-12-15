import { SetMetadata } from '@nestjs/common'
import { Role } from '@yt-obs/store-sql'

export const PUBLIC_ROLE_KEY = Symbol('PUBLIC_ROLE_KEY')
export const PublicRole = () => SetMetadata(PUBLIC_ROLE_KEY, true)

export const ROLES_KEY = Symbol('ROLES_KEY')
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles)
