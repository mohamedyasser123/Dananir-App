import { Building2 } from "lucide-react"

export default function CompanyEmpty() {
  return (
    <div className="flex min-h-[420px] w-full flex-col items-center justify-center gap-4 rounded-[15px] border border-[#EAEAEA] bg-white p-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F3F4F6]">
        <Building2 className="h-7 w-7 text-[#99A1AF]" />
      </div>
      <div className="space-y-1">
        <h3 className="text-[18px] font-bold text-[#101828]">No companies yet</h3>
        <p className="text-[14px] text-[#667085]">Add your first company to get started.</p>
      </div>
    </div>
  )
}
