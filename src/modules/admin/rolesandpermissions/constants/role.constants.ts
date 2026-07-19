import type { PermissionCategory } from "../types/role.types"

export const ROLE_QUERY_KEYS = {
  all: ["roles"] as const,
  lists: () => [...ROLE_QUERY_KEYS.all, "list"] as const,
  detail: (id: string) => [...ROLE_QUERY_KEYS.all, "detail", id] as const,
}

export const PERMISSION_MATRIX_QUERY_KEYS = {
  all: ["permission-matrix"] as const,
  template: () => [...PERMISSION_MATRIX_QUERY_KEYS.all, "template"] as const,
}

export const DEFAULT_PERMISSION_MATRIX: PermissionCategory[] = [
  {
    category: "Users",
    permissions: [
      { id: "u_read", code: "users.read", view: true, edite: false, addDelete: false, manage: false },
      { id: "u_write", code: "users.write", view: true, edite: false, addDelete: false, manage: false },
      { id: "u_delete", code: "users.delete", view: true, edite: false, addDelete: false, manage: false },
    ],
  },
  {
    category: "Companies",
    permissions: [
      { id: "c_read", code: "companies.read", view: true, edite: false, addDelete: false, manage: false },
      { id: "c_write", code: "companies.write", view: true, edite: false, addDelete: false, manage: false },
      { id: "c_delete", code: "companies.delete", view: true, edite: false, addDelete: false, manage: false },
    ],
  },
  {
    category: "Orders",
    permissions: [
      { id: "o_read", code: "orders.read", view: true, edite: false, addDelete: false, manage: false },
      { id: "o_write", code: "orders.write", view: true, edite: false, addDelete: false, manage: false },
      { id: "o_delete", code: "orders.delete", view: true, edite: false, addDelete: false, manage: false },
    ],
  },
  {
    category: "Finance",
    permissions: [
      { id: "f_read", code: "finance.read", view: true, edite: false, addDelete: false, manage: false },
      { id: "f_write", code: "finance.write", view: true, edite: false, addDelete: false, manage: false },
      { id: "f_reports", code: "finance.reports", view: true, edite: false, addDelete: false, manage: false },
    ],
  },
  {
    category: "Settings",
    permissions: [
      { id: "s_read", code: "settings.read", view: true, edite: false, addDelete: false, manage: false },
      { id: "s_write", code: "settings.write", view: true, edite: false, addDelete: false, manage: false },
    ],
  },
]

export const ROLE_HEADER_COLORS = [
  "bg-[linear-gradient(to_right,#AD46FF,#8200DB)]",
  "bg-[linear-gradient(to_right,#2B7FFF,#1447E6)]",
  "bg-[linear-gradient(to_right,#00C950,#008236)]",
  "bg-[linear-gradient(to_right,#FF6900,#CA3500)]",
]
