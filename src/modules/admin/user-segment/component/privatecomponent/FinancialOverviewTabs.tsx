import { useState } from "react";
import ReceiptDetailsDialog from "./ReceiptDetailsDialog";
import LoanDetailsDialog from "./LoanDetailsDialog";
import TransactionDetailsDialog from "./TransactionDetailsDialog";
import OverviewTab from "./financial-overview/OverviewTab";
import LoansTab from "./financial-overview/LoansTab";
import { detailedLoans } from "./financial-overview/detailedLoans.data";
import { scheduleData } from "./financial-overview/schedule.data";
import type { PurchaseData, LoanData, DebtData, DetailedLoan, PaymentSchedule } from "./financial-overview/types";

export default function FinancialOverviewTabs() {
    const [activeTab, setActiveTab] = useState<"overview" | "loans" | "debts">("overview");
    const [selectedPurchase, setSelectedPurchase] = useState<PurchaseData | null>(null);
    const [selectedLoan, setSelectedLoan] = useState<DetailedLoan | null>(null);
    const [selectedDebt, setSelectedDebt] = useState<DebtData | null>(null);

    const handleLoanRowClick = (loan: LoanData) => {
        const detailed = detailedLoans.find((item) => item.id === loan.id);
        if (detailed) setSelectedLoan(detailed);
    };

    const handleScheduleRowClick = (installment: PaymentSchedule) => {
        const detailed = detailedLoans.find((item) => item.code === installment.code);
        if (detailed) setSelectedLoan(detailed);
    };

    return (
        <div className="w-full bg-[#FAFAFA] p-6 font-sans flex flex-col gap-6 text-[#101828]">

            <div className="flex items-center">
                <div className="bg-[#F3F4F6CC] p-1 rounded-[14px] flex items-center gap-1">
                    <button
                        onClick={() => setActiveTab("overview")}
                        className={`px-4 py-2 text-[13px] font-bold rounded-[10px] transition-all cursor-pointer ${activeTab === "overview"
                                ? "bg-white text-[#101828] shadow-sm"
                                : "text-[#6A7282] hover:text-[#101828]"
                            }`}
                    >
                        Overview
                    </button>

                    <button
                        onClick={() => setActiveTab("loans")}
                        className={`px-4 py-2 text-[13px] font-medium rounded-[8px] transition-all cursor-pointer ${activeTab === "loans"
                                ? "bg-white text-[#101828] shadow-sm"
                                : "text-[#64748B] hover:text-[#101828]"
                            }`}
                    >
                        Loans & Payments
                    </button>

                    <button
                        onClick={() => setActiveTab("debts")}
                        className={`px-4 py-2 text-[13px] font-medium rounded-[8px] transition-all cursor-pointer ${activeTab === "debts"
                                ? "bg-white text-[#101828] shadow-sm"
                                : "text-[#64748B] hover:text-[#101828]"
                            }`}
                    >
                        Debts & Credits
                    </button>
                </div>
            </div>

            {activeTab === "overview" && (
                <OverviewTab
                    onPurchaseRowClick={setSelectedPurchase}
                    onLoanRowClick={handleLoanRowClick}
                    onDebtRowClick={setSelectedDebt}
                />
            )}

            {activeTab === "loans" && <LoansTab onScheduleRowClick={handleScheduleRowClick} />}

            {activeTab === "debts" && (
                <div className="bg-white p-8 rounded-[16px] border border-[#EAEAEA] text-center text-slate-400">
                </div>
            )}

            <ReceiptDetailsDialog
                purchase={selectedPurchase}
                open={selectedPurchase !== null}
                onOpenChange={(isOpen) => !isOpen && setSelectedPurchase(null)}
            />
            <LoanDetailsDialog
                loan={selectedLoan}
                schedule={selectedLoan ? scheduleData.filter((item) => item.code === selectedLoan.code) : []}
                open={selectedLoan !== null}
                onOpenChange={(isOpen) => !isOpen && setSelectedLoan(null)}
            />
            <TransactionDetailsDialog
                debt={selectedDebt}
                open={selectedDebt !== null}
                onOpenChange={(isOpen) => !isOpen && setSelectedDebt(null)}
            />

        </div>
    );
}
