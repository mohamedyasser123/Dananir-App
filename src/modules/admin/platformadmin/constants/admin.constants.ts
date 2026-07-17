import type { AdminRole, Permission } from "../types/admin.types"

export const ADMIN_QUERY_KEYS = {
  all: ["admins"] as const,
  lists: () => [...ADMIN_QUERY_KEYS.all, "list"] as const,
  detail: (id: string) => [...ADMIN_QUERY_KEYS.all, "detail", id] as const,
}

export const ROLE_PERMISSIONS: Record<AdminRole, Permission[]> = {
  "Super Admin": [
    { key: "admins.view", label: "View Admins" },
    { key: "admins.create", label: "Create Admins" },
    { key: "admins.edit", label: "Edit Admins" },
    { key: "admins.delete", label: "Delete Admins" },
    { key: "roles.manage", label: "Manage Roles" },
    { key: "reports.view", label: "View Reports" },
  ],
  Admin: [
    { key: "admins.view", label: "View Admins" },
    { key: "admins.create", label: "Create Admins" },
    { key: "admins.edit", label: "Edit Admins" },
    { key: "reports.view", label: "View Reports" },
  ],
  Manager: [
    { key: "admins.view", label: "View Admins" },
    { key: "reports.view", label: "View Reports" },
  ],
  Support: [
    { key: "admins.view", label: "View Admins" },
  ],
}
