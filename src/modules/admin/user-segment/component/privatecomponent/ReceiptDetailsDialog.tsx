import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CreditCard, DollarSign,Hash, Receipt } from "lucide-react"
import type { PurchaseData } from "./financial-overview/types"

interface ReceiptDetailsDialogProps {
  purchase: PurchaseData | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

const STATUS_STYLES: Record<PurchaseData["status"], string> = {
  Completed: "bg-[#EFF6FF] text-[#1D4ED8]",
  Pending: "bg-[#FEF3C7] text-[#D97706]",
  Failed: "bg-[#FEE2E2] text-[#DC2626]",
}

export default function ReceiptDetailsDialog({ purchase, open, onOpenChange }: ReceiptDetailsDialogProps) {
  if (!purchase) return null

  const subtotal = purchase.items?.reduce((sum, item) => sum + item.price * item.qty, 0) ?? purchase.amount

 return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[460px] p-0 overflow-hidden rounded-[20px] border-none shadow-2xl bg-white">
        
        <DialogHeader className="px-6 py-4 border-b border-[#F1F5F9]">
          <DialogTitle className="text-[16px] font-bold text-[#1E293B]">
            Receipt Details
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 flex flex-col gap-6">
          
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-0.5">
              <h3 className="text-[18px] font-bold text-[#0F172A]">
                {purchase.storeName}
              </h3>
              <span className="text-[13px] text-[#94A3B8] font-medium">
                {purchase.date}
              </span>
            </div>
            <span
              className={`shrink-0 px-3 py-1 text-[12px] font-semibold rounded-full inline-flex items-center gap-1.5 ${
                STATUS_STYLES[purchase.status] || "bg-slate-100 text-slate-700"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              {purchase.status}
            </span>
          </div>

          <div className="w-full bg-[#F8FAFC] border border-[#F1F5F9] rounded-[16px] py-6 flex flex-col items-center justify-center gap-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]">
              TOTAL AMOUNT
            </span>
            <span className="text-[32px] font-black text-[#2C4F93] tracking-tight">
              ${purchase.amount?.toLocaleString()}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            
            <div className="bg-[#F8FAFC] p-3.5 rounded-[12px] flex flex-col gap-1 border border-[#F1F5F9]/60">
              <div className="flex items-center gap-1 text-[#94A3B8]">
                <Hash className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  TRANSACTION ID
                </span>
              </div>
              <span className="text-[14px] font-bold text-[#1E293B]">
                {purchase.txnId}
              </span>
            </div>

            <div className="bg-[#F8FAFC] p-3.5 rounded-[12px] flex flex-col gap-1 border border-[#F1F5F9]/60">
              <div className="flex items-center gap-1 text-[#94A3B8]">
                <CreditCard className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  PAYMENT METHOD
                </span>
              </div>
              <span className="text-[14px] font-bold text-[#1E293B]">
                {purchase.paymentMethod}
              </span>
            </div>

            <div className="bg-[#F8FAFC] p-3.5 rounded-[12px] flex flex-col gap-1 border border-[#F1F5F9]/60">
              <div className="flex items-center gap-1 text-[#94A3B8]">
                <Receipt className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  TAX / VAT
                </span>
              </div>
              <span className="text-[14px] font-bold text-[#1E293B]">
                {purchase.taxAmount ? `$${purchase.taxAmount.toFixed(2)}` : "$62.48"}
              </span>
            </div>

            <div className="bg-[#F8FAFC] p-3.5 rounded-[12px] flex flex-col gap-1 border border-[#F1F5F9]/60">
              <div className="flex items-center gap-1 text-[#94A3B8]">
                <DollarSign className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  FEES
                </span>
              </div>
              <span className="text-[14px] font-bold text-[#1E293B]">
                {purchase.fees ?? "None"}
              </span>
            </div>

          </div>

          {purchase.items && purchase.items.length > 0 && (
            <div className="flex flex-col gap-2.5">
              <span className="text-[13px] font-bold text-[#1E293B]">Items</span>
              <div className="bg-[#F8FAFC] rounded-[16px] overflow-hidden border border-[#F1F5F9] divide-y divide-[#F1F5F9]">
                
                {purchase.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-white"
                  >
                    <div className="flex flex-col">
                      <span className="text-[14px] font-semibold text-[#1E293B]">
                        {item.name}
                      </span>
                      <span className="text-[12px] text-[#94A3B8]">
                        Qty: {item.qty}
                      </span>
                    </div>
                    <span className="text-[14px] font-bold text-[#1E293B]">
                      ${item.price.toLocaleString()}
                    </span>
                  </div>
                ))}

                <div className="flex items-center justify-between px-4 py-3 text-[13px]">
                  <span className="text-[#64748B] font-medium">Subtotal</span>
                  <span className="font-semibold text-[#475569]">
                    ${subtotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between px-4 py-3 text-[13px]">
                  <span className="text-[#64748B] font-medium">Tax / VAT</span>
                  <span className="font-semibold text-[#475569]">
                    ${purchase.taxAmount ? purchase.taxAmount.toFixed(2) : "62.48"}
                  </span>
                </div>

                <div className="flex items-center justify-between px-4 py-3.5 text-[14px] font-bold">
                  <span className="text-[#0F172A]">Total</span>
                  <span className="text-[#0F172A]">
                    ${purchase.amount.toLocaleString()}
                  </span>
                </div>

              </div>
            </div>
          )}

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              className="flex-1 h-[46px] bg-[#2C4F93] hover:bg-[#233F77] text-white text-[13px] font-bold rounded-[12px] flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
            >
              <Receipt className="w-4 h-4" />
              Download Receipt
            </button>
            <button
              type="button"
              className="flex-1 h-[46px] bg-white border border-[#E2E8F0] hover:bg-slate-50 text-[#475569] text-[13px] font-bold rounded-[12px] flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              Report Issue
            </button>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}
