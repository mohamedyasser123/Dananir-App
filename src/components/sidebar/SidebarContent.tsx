import { sidebarConfig } from "../../config/sidebar"
import SidebarItem from "./SidebarItem"
import SidebarGroup from "./SidebarGroup"

export default function SidebarContent() {
  return (
    <nav className="flex-1 min-h-0 overflow-y-auto no-scrollbar px-1 pb-6 space-y-2">
      {sidebarConfig.map((item) =>
        item.children ? (
          <SidebarGroup key={item.title} item={item} />
        ) : (
          <SidebarItem key={item.title} item={item} />
        )
      )}
    </nav>
  )
}
