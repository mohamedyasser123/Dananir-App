import { AlertCircle } from "lucide-react"

interface AppAdsErrorProps {
  message?: string
  onRetry: () => void
}

export default function AppAdsError({ message, onRetry }: AppAdsErrorProps) {
  return (
    <div className="flex min-h-[420px] w-full flex-col items-center justify-center gap-4 rounded-[15px] border border-[#EAEAEA] bg-white p-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FEE2E2]">
        <AlertCircle className="h-7 w-7 text-[#EF4444]" />
      </div>
      <div className="space-y-1">
        <h3 className="text-[18px] font-bold text-[#101828]">Failed to load app ads</h3>
        <p className="text-[14px] text-[#667085]">{message ?? "Something went wrong while fetching app ads."}</p>
      </div>
      <button
        type="button"
        onClick={onRetry}
        className="rounded-[10px] bg-[#2C4F93] px-5 py-2.5 text-[14px] font-semibold text-white transition-all duration-200 hover:bg-[#25417a]"
      >
        Try again
      </button>
    </div>
  )
}
