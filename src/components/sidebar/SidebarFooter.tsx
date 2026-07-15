import type { SidebarFooterProps } from "../../types/sidebar"

export default function SidebarFooter({ children }: SidebarFooterProps) {
  if (!children) return null

  return (
    <div className="shrink-0 border-t border-white/10 px-5 py-4 text-[12px] text-white/60">
      {children}
    </div>
  )
}
