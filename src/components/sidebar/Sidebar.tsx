import SidebarHeader from "./SidebarHeader"
import SidebarContent from "./SidebarContent"
import SidebarFooter from "./SidebarFooter"

export default function Sidebar() {
  return (
    <div className="flex flex-col h-full bg-[linear-gradient(to_bottom,#203054,#3B5D9E,#294A87)] text-white/90 select-none !px-2">
      <SidebarHeader />
      <SidebarContent />
      <SidebarFooter />
    </div>
  )
}
