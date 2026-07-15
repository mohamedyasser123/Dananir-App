import type { CSSProperties } from "react"
import type { SidebarItemConfig } from "../types/sidebar"

export function isItemActive(item: SidebarItemConfig, pathname: string): boolean {
  if (item.path && pathname === item.path) return true
  if (item.children) return item.children.some((child) => isItemActive(child, pathname))
  return false
}

const BASE_INDENT_PX = 16
const DEPTH_INDENT_PX = 20

export function getIndentStyle(depth: number): CSSProperties | undefined {
  if (depth <= 0) return undefined
  return { paddingLeft: `${BASE_INDENT_PX + depth * DEPTH_INDENT_PX}px` }
}
