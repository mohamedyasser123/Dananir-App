import type { Role } from "../types/role.types"

export function isRolesEmpty(roles: Role[]): boolean {
  return roles.length === 0
}
