import type { AdminUser } from "../types/admin.types"

export function filterAdmins(admins: AdminUser[], search: string): AdminUser[] {
  const term = search.trim().toLowerCase()
  if (!term) return admins

  return admins.filter(
    (admin) =>
      admin.name.toLowerCase().includes(term) ||
      admin.email.toLowerCase().includes(term)
  )
}

export function isAdminsEmpty(admins: AdminUser[]): boolean {
  return admins.length === 0
}
