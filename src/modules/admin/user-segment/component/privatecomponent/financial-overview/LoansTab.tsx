import { Building2, Bell, Send } from "lucide-react";
import SharedTable from "@/components/shared/SharedTable";
import { detailedLoans } from "./detailedLoans.data";
import { scheduleData, scheduleColumns } from "./schedule.data";
import type { PaymentSchedule } from "./types";

interface LoansTabProps {
    onScheduleRowClick: (item: PaymentSchedule) => void;
}

export default function LoansTab({ onScheduleRowClick }: LoansTabProps) {
    return (
        <div className="flex flex-col gap-6 w-full mt-2">

            <div className="flex flex-col gap-4 w-full">
                {detailedLoans.map((loan) => {
                    const isCompleted = loan.status === "Completed";
                    const themeColor = isCompleted ? "#10B981" : "#1E3A8A";
                    const progressBg = isCompleted ? "bg-[#10B981]" : "bg-[#1E3A8A]";

                    return (
                        <div
                            key={loan.id}
                            className="bg-white border border-[#EAEAEA] rounded-[16px] overflow-hidden shadow-sm flex flex-col"
                        >
                            <div className="h-[3px] w-full" style={{ backgroundColor: themeColor }} />

                            <div className="p-6 flex flex-col gap-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-[12px] bg-[#F1F5F9] flex items-center justify-center text-[#64748B]">
                                            <Building2 className="w-5 h-5" />
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[16px] font-bold text-[#101828]">{loan.bank}</span>
                                                <span
                                                    className={`px-2 py-0.5 text-[11px] font-medium rounded-full inline-flex items-center gap-1 ${
                                                        isCompleted ? "bg-[#E6F4EA] text-[#137333]" : "bg-[#E6F4EA] text-[#137333]"
                                                    }`}
                                                >
                                                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                                                    {loan.status}
                                                </span>
                                            </div>
                                            <span className="text-[12px] text-[#99A1AF]">
                                                {loan.type} · {loan.code} · {loan.branch}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end">
                                        <span className="text-[18px] font-bold text-[#101828]">
                                            ${loan.totalAmount.toLocaleString()}
                                        </span>
                                        <span className="text-[11px] text-[#99A1AF]">Total Amount</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-2">
                                    <div className="flex flex-col">
                                        <span className="text-[11px] text-[#99A1AF] font-medium uppercase tracking-wider">REMAINING</span>
                                        <span className="text-[15px] font-bold text-[#101828] mt-0.5">
                                            ${loan.remaining.toLocaleString()}
                                        </span>
                                    </div>

                                    <div className="flex flex-col">
                                        <span className="text-[11px] text-[#99A1AF] font-medium uppercase tracking-wider">MONTHLY</span>
                                        <span className="text-[15px] font-bold text-[#101828] mt-0.5">
                                            {loan.monthly ? `$${loan.monthly.toLocaleString()}` : "—"}
                                        </span>
                                    </div>

                                    <div className="flex flex-col">
                                        <span className="text-[11px] text-[#99A1AF] font-medium uppercase tracking-wider">INTEREST RATE</span>
                                        <span className="text-[15px] font-bold text-[#101828] mt-0.5">{loan.interestRate}</span>
                                    </div>

                                    <div className="flex flex-col">
                                        <span className="text-[11px] text-[#99A1AF] font-medium uppercase tracking-wider">DURATION</span>
                                        <span className="text-[15px] font-bold text-[#101828] mt-0.5">{loan.duration}</span>
                                    </div>

                                    <div className="flex flex-col">
                                        <span className="text-[11px] text-[#99A1AF] font-medium uppercase tracking-wider">LOAN OFFICER</span>
                                        <span className="text-[13px] font-semibold text-[#334155] mt-0.5">{loan.loanOfficer}</span>
                                    </div>
                                </div>

                                {/* Progress Bar + Paid Stats */}
                                <div className="flex flex-col gap-2 pt-1">
                                    <div className="w-full h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                                        <div
                                            className={`h-full ${progressBg} rounded-full transition-all duration-500`}
                                            style={{ width: `${loan.percentagePaid}%` }}
                                        />
                                    </div>

                                    <div className="flex items-center justify-between text-[11px] text-[#99A1AF]">
                                        <span>Paid: ${loan.paidAmount.toLocaleString()}</span>
                                        <div className="flex items-center gap-3">
                                            <span className="font-bold text-[#101828]">{loan.percentagePaid}% paid</span>
                                            <span>{loan.startDate} &rarr; {loan.endDate}</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="bg-[#1E3A8A] text-white rounded-[16px] p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-md">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-[14px] font-semibold text-blue-200">
                        <Bell className="w-4 h-4" />
                        <span>Payment Reminder</span>
                    </div>
                    <h3 className="text-[22px] font-bold text-white">$10,400 due on April 1, 2026</h3>
                    <p className="text-[12px] text-blue-200">3 active loans · Next installment in 4 days</p>
                </div>

                <button className="h-[44px] px-6 bg-white hover:bg-slate-100 text-[#1E3A8A] text-[13px] font-bold rounded-[10px] flex items-center justify-center gap-2 cursor-pointer transition-colors shrink-0">
                    <Send className="w-4 h-4 transform -rotate-45" />
                    <span>Send Reminder</span>
                </button>
            </div>

            <div className="bg-white border border-[#EAEAEA] rounded-[16px] p-6 shadow-sm flex flex-col gap-4 mt-2">
                <h3 className="text-[16px] font-bold text-[#101828]">Upcoming Payment Schedule</h3>
                <SharedTable data={scheduleData} columns={scheduleColumns} showFilters={false} onRowClick={onScheduleRowClick} />
            </div>

        </div>
    );
}
