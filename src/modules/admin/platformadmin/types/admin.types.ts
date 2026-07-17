export type AdminRole = "Super Admin" | "Admin" | "Manager" | "Support"
export type AdminStatus = "ACTIVE" | "INACTIVE"

export interface AdminUser {
  id: string
  name: string
  email: string
  role: AdminRole
  status: AdminStatus
}

export type PermissionKey =
  | "admins.view"
  | "admins.create"
  | "admins.edit"
  | "admins.delete"
  | "roles.manage"
  | "reports.view"

export interface Permission {
  key: PermissionKey
  label: string
}

export interface AdminDetails extends AdminUser {
  permissions: Permission[]
  createdAt: string
  lastLoginAt: string | null
}
