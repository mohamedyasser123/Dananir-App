import { memo } from "react"
import { NavLink } from "react-router-dom"
import { cn } from "../../utils/utils"
import type { SidebarNodeProps } from "../../types/sidebar"

function SidebarItem({ item }: SidebarNodeProps) {
  const Icon = item.icon

  return (
    <NavLink
      to={item.path ?? "#"}
      className={({ isActive }) =>
        cn(
          "flex h-14 items-center gap-2 pl-[13px] pr-6 rounded-2xl text-[17px] font-medium cursor-pointer transition-all duration-200",
          isActive
            ? "bg-[#FCFCFC] text-[#2C4F93] font-semibold"
            : "text-[#FCFCFC] hover:text-white hover:bg-white/10"
        )}
    >
      <Icon className="h-6 w-6 shrink-0 opacity-90" />
      <span className="truncate">{item.title}</span>
    </NavLink>
  )
}

export default memo(SidebarItem)
