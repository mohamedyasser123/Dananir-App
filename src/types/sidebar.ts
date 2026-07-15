import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"

export interface SidebarItemConfig {
  title: string
  icon: LucideIcon
  path?: string
  permission?: string
  children?: SidebarItemConfig[]
}

export interface SidebarNodeProps {
  item: SidebarItemConfig
  depth?: number
}

export interface SidebarCollapseProps {
  isOpen: boolean
  children: ReactNode
}

export interface SidebarFooterProps {
  children?: ReactNode
}
