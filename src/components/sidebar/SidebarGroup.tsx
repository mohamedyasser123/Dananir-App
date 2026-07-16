import { memo, useState } from "react"
import { useLocation } from "react-router-dom"
import { ChevronDown } from "lucide-react"
import { cn } from "../../utils/utils"
import { isItemActive } from "../../utils/sidebar"
import type { SidebarNodeProps } from "../../types/sidebar"
import SidebarItem from "./SidebarItem"

function SidebarGroup({ item }: SidebarNodeProps) {
  const { pathname } = useLocation()
  const containsActiveChild = isItemActive(item, pathname)
  const [manualOpen, setManualOpen] = useState(false)
  const isOpen = containsActiveChild || manualOpen
  const Icon = item.icon

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={() => setManualOpen((prev) => !prev)}
        className={cn(
          "flex h-14 w-full items-center justify-between pl-[13px] pr-6 rounded-2xl text-[17px] font-bold cursor-pointer transition-all duration-200",
          containsActiveChild
            ? "bg-white text-[#254b9c] "
            : "text-white/90 hover:bg-white/5"
        )}
      >
        <span className="flex items-center gap-4">
          <Icon className="h-6 w-6 shrink-0" />
          <span className="truncate">{item.title}</span>
        </span>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 transition-transform duration-200 opacity-85",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && item.children && (
        <div className="flex flex-col space-y-2 pl-5">
          {item.children.map((child) =>
            child.children ? (
              <SidebarGroup key={child.title} item={child} />
            ) : (
              <SidebarItem key={child.title} item={child} />
            )
          )}
        </div>
      )}
    </div>
  )
}

export default memo(SidebarGroup)
