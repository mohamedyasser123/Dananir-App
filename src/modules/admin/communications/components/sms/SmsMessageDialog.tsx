import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Clock } from "lucide-react"
import type { Sms, SmsStatus } from "../../types/communication.types"

interface SmsMessageDialogProps {
  message: Sms | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

function getStatusStyle(status: SmsStatus) {
  switch (status) {
    case "DELIVERED":
      return "bg-[#E6F4EA] text-[#137333]"
    case "PENDING":
      return "bg-[#FEF7E0] text-[#B06000]"
    case "FAILED":
      return "bg-[#FCE8E6] text-[#C5221F]"
    default:
      return "bg-slate-100 text-slate-600"
  }
}

export default function SmsMessageDialog({ message, open, onOpenChange }: SmsMessageDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{message?.phone}</DialogTitle>
        </DialogHeader>

        {message && (
          <div className="flex flex-col gap-4 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[12px] text-[#99A1AF]">
                <Clock className="w-3.5 h-3.5" />
                <span>{message.time}</span>
              </div>
              <span
                className={`px-2.5 py-0.5 text-[11px] font-bold rounded-full tracking-wide ${getStatusStyle(
                  message.status
                )}`}
              >
                {message.status}
              </span>
            </div>

            <p className="text-[14px] text-[#101828] leading-relaxed bg-[#F9FAFB] border border-[#EAEAEA] rounded-[10px] p-4">
              {message.body}
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
