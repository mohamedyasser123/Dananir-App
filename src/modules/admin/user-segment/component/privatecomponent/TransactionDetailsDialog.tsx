import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"; // عدل الباث حسب مشروعك
import { Send } from "lucide-react";
import type { DebtData } from "./financial-overview/types"

const STATUS_BADGES: Record<string, string> = {
  Paid: "bg-[#E6F4EA] text-[#10B981]",
  Partial: "bg-[#FEF3C7] text-[#D97706]",
  Pending: "bg-[#FEE2E2] text-[#EF4444]",
};

interface DebtDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  debt: DebtData | null;
}

export function DebtDetailsModal({ open, onOpenChange, debt }: DebtDetailsModalProps) {
  if (!debt) return null;

  const isDebit = debt.type === "Debit";
  const progressPercent =
    debt.total > 0 ? Math.min((debt.paid / debt.total) * 100, 100) : 0;

  // استخراج الحروف الأولى من الاسم (Initials)
  const getInitials = (name: string) => {
    if (!name) return "TM";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[460px] p-0 overflow-hidden rounded-[20px] border-none shadow-2xl bg-white">

        {/* Header الرئيسي */}
        <DialogHeader className="px-6 py-4 border-b border-[#F1F5F9]">
          <DialogTitle className="text-[16px] font-bold text-[#1E293B]">
            Transaction Details
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 flex flex-col gap-6">

          {/* معلومات الشخص والبادج */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              {/* Avatar بحروف الاسم */}
              <div className="w-12 h-12 rounded-full bg-[#ECFDF5] text-[#10B981] font-bold text-[15px] flex items-center justify-center shrink-0">
                {getInitials(debt.person)}
              </div>
              <div className="flex flex-col gap-0.5">
                <h3 className="text-[17px] font-bold text-[#0F172A] leading-tight">
                  {debt.person}
                </h3>
                <span className="text-[13px] text-[#94A3B8]">
                  {debt.code || "DC-002"} · {debt.date}
                </span>
              </div>
            </div>

            {/* Badge - Debit / Credit */}
            <span
              className={`px-3 py-1 text-[12px] font-semibold rounded-full inline-flex items-center gap-1 ${
                isDebit
                  ? "bg-[#FEE2E2] text-[#EF4444]"
                  : "bg-[#ECFDF5] text-[#10B981]"
              }`}
            >
              <span>{isDebit ? "↗" : "↘"}</span>
              {isDebit ? "Debit" : "Credit"}
            </span>
          </div>

          {/* كارت الوصف DESCRIPTION */}
          {debt.note && (
            <div className="bg-[#F8FAFC] border border-[#F1F5F9] rounded-[14px] p-4 flex flex-col gap-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">
                DESCRIPTION
              </span>
              <p className="text-[14px] font-semibold text-[#334155]">
                {debt.note}
              </p>
            </div>
          )}

          <div className="grid grid-cols-3 gap-3">

            {/* TOTAL */}
            <div className="bg-[#F8FAFC] border border-[#F1F5F9] p-4 rounded-[14px] flex flex-col gap-1.5 items-center justify-center text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">
                TOTAL
              </span>
              <span className="text-[18px] font-black text-[#0F172A]">
                ${debt.total.toLocaleString()}
              </span>
            </div>

            {/* PAID */}
            <div className="bg-[#ECFDF5] border border-[#D1FAE5] p-4 rounded-[14px] flex flex-col gap-1.5 items-center justify-center text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#059669]">
                PAID
              </span>
              <span className="text-[18px] font-black text-[#059669]">
                ${debt.paid.toLocaleString()}
              </span>
            </div>

            {/* REMAINING */}
            <div className="bg-[#FEF2F2] border border-[#FEE2E2] p-4 rounded-[14px] flex flex-col gap-1.5 items-center justify-center text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#EF4444]">
                REMAINING
              </span>
              <span className="text-[18px] font-black text-[#EF4444]">
                {debt.remaining > 0 ? `$${debt.remaining.toLocaleString()}` : "—"}
              </span>
            </div>

          </div>

          {/* Progress Bar */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-[12px]">
              <span className="text-[#94A3B8] font-medium">
                Payment Progress
              </span>
              <span className="font-bold text-[#0F172A]">
                {Math.round(progressPercent)}%
              </span>
            </div>
            <div className="w-full h-2.5 bg-[#E2E8F0] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#10B981] rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* كارت الحالة STATUS */}
          <div className="bg-[#F8FAFC] border border-[#F1F5F9] rounded-[14px] p-4 flex flex-col gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">
              STATUS
            </span>
            <div>
              <span
                className={`px-3 py-1 text-[12px] font-bold rounded-full inline-flex items-center gap-1.5 ${
                  STATUS_BADGES[debt.status] || "bg-slate-100 text-slate-700"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {debt.status}
              </span>
            </div>
          </div>

          {/* زر إرسال التذكير */}
          <button
            type="button"
            className="w-full h-[46px] bg-white border border-[#E2E8F0] hover:bg-slate-50 text-[#475569] text-[13px] font-bold rounded-[12px] flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm mt-1"
          >
            <Send className="w-4 h-4 transform -rotate-45" />
            Send Reminder
          </button>

        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DebtDetailsModal;
