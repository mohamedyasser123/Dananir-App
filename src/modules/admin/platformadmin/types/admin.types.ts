export type AdminRole = "Super Admin" | "Admin" | "Manager" | "Support"
export type AdminStatus = "ACTIVE" | "INACTIVE"

export interface AdminUser {
  id: string
  name: string
  email: string
  role: AdminRole
  status: AdminStatus
}
