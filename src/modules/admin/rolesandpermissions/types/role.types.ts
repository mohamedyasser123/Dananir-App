export interface Role {
  id: string
  title: string
  userCount: string
  headerBg: string
  isAllPermissions: boolean
  permissions: string[]
}

export interface PermissionEntry {
  id: string
  code: string
  view: boolean
  edite: boolean
  addDelete: boolean
  manage: boolean
}

export interface PermissionCategory {
  category: string
  permissions: PermissionEntry[]
}
