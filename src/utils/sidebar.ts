import type { SidebarItemConfig } from "../types/sidebar"

export function isItemActive(item: SidebarItemConfig, pathname: string): boolean {
  if (item.path && pathname === item.path) return true
  if (item.children) return item.children.some((child) => isItemActive(child, pathname))
  return false
}
