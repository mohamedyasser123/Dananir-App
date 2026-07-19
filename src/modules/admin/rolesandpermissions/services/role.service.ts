import type { PermissionCategory, Role } from "../types/role.types"
import type { CreateRoleFormValues, UpdateRoleFormValues } from "../schemas/role.schema"
import { DEFAULT_PERMISSION_MATRIX, ROLE_HEADER_COLORS } from "../constants/role.constants"

const NETWORK_DELAY_MS = 600

function delay<T>(data: T, ms = NETWORK_DELAY_MS): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms))
}

let roles: Role[] = [
  {
    id: "1",
    title: "Super Admin",
    userCount: "1 user",
    headerBg: ROLE_HEADER_COLORS[0],
    isAllPermissions: true,
    permissions: ["All Permissions"],
  },
  {
    id: "2",
    title: "Admin",
    userCount: "3 users",
    headerBg: ROLE_HEADER_COLORS[1],
    isAllPermissions: false,
    permissions: ["users.read", "users.write", "companies.read", "+3 more"],
  },
  {
    id: "3",
    title: "Manager",
    userCount: "2 users",
    headerBg: ROLE_HEADER_COLORS[2],
    isAllPermissions: false,
    permissions: ["users.read", "orders.read", "orders.write", "+1 more"],
  },
  {
    id: "4",
    title: "Support",
    userCount: "2 users",
    headerBg: ROLE_HEADER_COLORS[3],
    isAllPermissions: false,
    permissions: ["users.read", "tickets.read", "tickets.write"],
  },
]

function generateId(): string {
  const maxId = roles.reduce((max, role) => Math.max(max, Number(role.id) || 0), 0)
  return (maxId + 1).toString()
}

function derivePermissionSummary(matrix: PermissionCategory[]): Pick<Role, "isAllPermissions" | "permissions"> {
  const checkedCodes = matrix
    .flatMap((category) => category.permissions)
    .filter((permission) => permission.view || permission.edite || permission.addDelete || permission.manage)

  const isAllPermissions = checkedCodes.length > 0 && checkedCodes.every((permission) => permission.manage)
  if (isAllPermissions) {
    return { isAllPermissions: true, permissions: ["All Permissions"] }
  }

  const codes = checkedCodes.map((permission) => permission.code)
  const visibleCodes = codes.slice(0, 3)
  const remaining = codes.length - visibleCodes.length

  return {
    isAllPermissions: false,
    permissions: remaining > 0 ? [...visibleCodes, `+${remaining} more`] : visibleCodes,
  }
}

export async function getRoles(): Promise<Role[]> {
  return delay([...roles])
}

export async function getRoleById(id: string): Promise<Role> {
  const role = roles.find((item) => item.id === id)
  if (!role) {
    throw new Error(`Role with id "${id}" was not found`)
  }
  return delay(role)
}

export async function createRole(payload: CreateRoleFormValues): Promise<Role> {
  const summary = derivePermissionSummary(payload.matrix)
  const newRole: Role = {
    id: generateId(),
    title: payload.name,
    userCount: "0 users",
    headerBg: ROLE_HEADER_COLORS[roles.length % ROLE_HEADER_COLORS.length],
    ...summary,
  }
  roles = [...roles, newRole]
  return delay(newRole)
}

export async function updateRole(payload: UpdateRoleFormValues): Promise<Role> {
  const existing = roles.find((role) => role.id === payload.id)
  if (!existing) {
    throw new Error(`Role with id "${payload.id}" was not found`)
  }

  const summary = payload.matrix ? derivePermissionSummary(payload.matrix) : undefined
  const updated: Role = {
    ...existing,
    ...(payload.name ? { title: payload.name } : {}),
    ...summary,
  }
  roles = roles.map((role) => (role.id === payload.id ? updated : role))
  return delay(updated)
}

export async function deleteRole(id: string): Promise<{ id: string }> {
  roles = roles.filter((role) => role.id !== id)
  return delay({ id })
}

export async function getPermissionMatrixTemplate(): Promise<PermissionCategory[]> {
  return delay(DEFAULT_PERMISSION_MATRIX.map((category) => ({
    ...category,
    permissions: category.permissions.map((permission) => ({ ...permission })),
  })))
}
