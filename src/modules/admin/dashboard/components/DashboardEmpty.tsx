import { Inbox } from "lucide-react"

export default function DashboardEmpty() {
  return (
    <div className="flex min-h-[480px] w-full flex-col items-center justify-center gap-4 p-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F3F4F6]">
        <Inbox className="h-7 w-7 text-[#99A1AF]" />
      </div>
      <div className="space-y-1">
        <h3 className="text-[18px] font-bold text-[#101828]">No dashboard data yet</h3>
        <p className="text-[14px] text-[#667085]">Once activity starts coming in, it will show up here.</p>
      </div>
    </div>
  )
}
