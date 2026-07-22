import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"; // عدل الباث حسب مشروعك
import { Building2, Send } from "lucide-react";
import type { DetailedLoan, PaymentSchedule } from "./financial-overview/types"

const STATUS_BADGES: Record<string, string> = {
  Active: "bg-[#E6F4EA] text-[#137333]",
  Completed: "bg-[#EFF6FF] text-[#1D4ED8]",
  Upcoming: "bg-[#F1F5F9] text-[#475569]",
  Paid: "bg-[#E6F4EA] text-[#137333]",
  Late: "bg-[#FEE2E2] text-[#DC2626]",
};

const STATUS_DOTS: Record<string, string> = {
  Upcoming: "bg-[#CBD5E1]",
  Paid: "bg-[#10B981]",
  Late: "bg-[#EF4444]",
};

interface LoanDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  loan: DetailedLoan | null;
  schedule?: PaymentSchedule[];
}

export function LoanDetailsModal({ open, onOpenChange, loan, schedule = [] }: LoanDetailsModalProps) {
  if (!loan) return null;

  const isCompleted = loan.status === "Completed";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden rounded-[20px] border-none shadow-2xl bg-white">
        
        {/* Header الرئيسي */}
        <DialogHeader className="px-6 py-4 border-b border-[#F1F5F9]">
          <DialogTitle className="text-[16px] font-bold text-[#1E293B]">
            Loan Details
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 flex flex-col gap-6 max-h-[80vh] overflow-y-auto">
          
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-[14px] bg-[#F1F5F9] flex items-center justify-center text-[#2C4F93] shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div className="flex flex-col gap-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-[17px] font-bold text-[#0F172A] leading-tight">
                  {loan.bank}
                </h3>
                <span
                  className={`px-2.5 py-0.5 text-[11px] font-semibold rounded-full inline-flex items-center gap-1.5 ${
                    STATUS_BADGES[loan.status] || "bg-slate-100 text-slate-700"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  {loan.status}
                </span>
              </div>
              <span className="text-[13px] text-[#94A3B8]">
                {loan.branch || "Giza – Dokki Branch"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-[#EFF6FF] text-[#2C4F93] text-[12px] font-semibold rounded-md">
              {loan.type}
            </span>
            <span className="text-[13px] font-medium text-[#94A3B8]">
              {loan.code}
            </span>
          </div>

          <div className="w-full bg-[#F8FAFC] border border-[#F1F5F9] rounded-[16px] p-5 flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">
                  TOTAL LOAN AMOUNT
                </span>
                <span className="text-[28px] font-black text-[#2C4F93] tracking-tight">
                  ${loan.totalAmount?.toLocaleString()}
                </span>
              </div>

              <div className="flex flex-col items-end gap-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">
                  REMAINING
                </span>
                <span className="text-[20px] font-extrabold text-[#EF4444]">
                  ${loan.remaining?.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="w-full h-2.5 bg-[#E2E8F0] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#2C4F93] rounded-full transition-all duration-500"
                  style={{ width: `${loan.percentagePaid}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] font-medium">
                <span className="text-[#94A3B8]">
                  Paid: ${loan.paidAmount?.toLocaleString()}
                </span>
                <span className="font-bold text-[#2C4F93]">
                  {loan.percentagePaid}% Complete
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <InfoCard
              label="MONTHLY INSTALLMENT"
              value={loan.monthly ? `$${loan.monthly.toLocaleString()}` : "—"}
            />
            <InfoCard label="INTEREST RATE" value={loan.interestRate} />
            <InfoCard label="DURATION" value={loan.duration} />
            <InfoCard label="START DATE" value={loan.startDate} />
            <InfoCard label="END DATE" value={loan.endDate} />
            <InfoCard label="LOAN OFFICER" value={loan.loanOfficer} />
          </div>

          {schedule.length > 0 && (
            <div className="flex flex-col gap-3 pt-1">
              <h4 className="text-[14px] font-bold text-[#1E293B]">
                Payment Schedule
              </h4>
              <div className="bg-[#F8FAFC] rounded-[16px] border border-[#F1F5F9] divide-y divide-[#F1F5F9] overflow-hidden">
                {schedule.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3.5 bg-white hover:bg-slate-50/50 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          STATUS_DOTS[item.status] || "bg-slate-300"
                        }`}
                      />
                      <span className="text-[13px] font-medium text-[#475569]">
                        {item.installmentDate}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[14px] font-bold text-[#0F172A]">
                        ${item.amount?.toLocaleString()}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 text-[11px] font-semibold rounded-full inline-flex items-center gap-1 ${
                          STATUS_BADGES[item.status] ||
                          "bg-slate-100 text-slate-700"
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!isCompleted && (
            <button
              type="button"
              className="w-full h-[46px] bg-[#2C4F93] hover:bg-[#233F77] text-white text-[13px] font-bold rounded-[12px] flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm mt-1"
            >
              <Send className="w-4 h-4 transform -rotate-45" />
              Send Reminder
            </button>
          )}

        </div>
      </DialogContent>
    </Dialog>
  );
}

export default LoanDetailsModal;

function InfoCard({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="bg-[#F8FAFC] p-3.5 rounded-[12px] flex flex-col gap-1 border border-[#F1F5F9]/60">
      <span className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">
        {label}
      </span>
      <span className="text-[14px] font-bold text-[#1E293B]">
        {value || "—"}
      </span>
    </div>
  );
}