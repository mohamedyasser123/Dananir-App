import { DollarSign, Building2, Clock, TrendingUp, Bell, Send } from "lucide-react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import SharedTable from "@/components/shared/SharedTable";
import { spendingData } from "./spending.data";
import { purchasesData, purchaseColumns } from "./purchases.data";
import { loansData, loanColumns } from "./loans.data";
import { debtsData, debtColumns } from "./debts.data";
import type { PurchaseData, LoanData, DebtData } from "./types";

interface OverviewTabProps {
    onPurchaseRowClick: (purchase: PurchaseData) => void;
    onLoanRowClick: (loan: LoanData) => void;
    onDebtRowClick: (debt: DebtData) => void;
}

export default function OverviewTab({ onPurchaseRowClick, onLoanRowClick, onDebtRowClick }: OverviewTabProps) {
    return (
        <div className="flex flex-col gap-8 w-full mt-4">

            <div className="flex flex-col lg:flex-row gap-6 items-start w-full">

                <div className="flex-1 w-full bg-white border border-[#EAEAEA] rounded-[16px] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.01)] flex flex-col gap-6 min-h-[380px]">
                    <div className="flex items-center justify-between">
                        <h3 className="text-[16px] font-bold text-[#101828]">Monthly Spending</h3>
                        <span className="text-[12px] font-medium text-[#99A1AF]">Oct 2025 – Mar 2026</span>
                    </div>

                    <div className="w-full h-[280px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={spendingData}
                                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                            >
                                <defs>
                                    <linearGradient id="spendingGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#2C4F93" stopOpacity={0.08} />
                                        <stop offset="95%" stopColor="#2C4F93" stopOpacity={0.0} />
                                    </linearGradient>
                                </defs>

                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    vertical={false}
                                    stroke="#F1F5F9"
                                />

                                <XAxis
                                    dataKey="month"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#99A1AF", fontSize: 12 }}
                                    dy={10}
                                />

                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#99A1AF", fontSize: 12 }}
                                    tickFormatter={(val) => `$${val / 1000}k`}
                                    domain={[0, 6000]}
                                    ticks={[0, 1500, 3000, 4500, 6000]}
                                />

                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#101828",
                                        borderRadius: "8px",
                                        color: "#fff",
                                        fontSize: "12px",
                                        border: "none",
                                    }}
                                    itemStyle={{ color: "#fff" }}
                                />

                                <Area
                                    type="monotone"
                                    dataKey="amount"
                                    stroke="#2C4F93"
                                    strokeWidth={2.5}
                                    fillOpacity={1}
                                    fill="url(#spendingGradient)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="w-full lg:w-[340px] flex flex-col gap-5 shrink-0">

                    <div className="bg-white border border-[#EAEAEA] rounded-[16px] p-5 shadow-[0_1px_2px_rgba(0,0,0,0.01)] flex flex-col gap-4">
                        <h4 className="text-[15px] font-bold text-[#101828]">Financial Snapshot</h4>

                        <div className="flex flex-col gap-4 mt-1">
                            <div className="flex items-center gap-3">
                                <div className="w-[38px] h-[38px] rounded-[10px] bg-[#EEF2F6] flex items-center justify-center text-[#2C4F93] shrink-0">
                                    <DollarSign className="w-4 h-4 stroke-[2.5]" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[11px] font-medium text-[#99A1AF]">Net Worth Estimate</span>
                                    <span className="text-[16px] font-bold text-[#101828]">$124,800</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-[38px] h-[38px] rounded-[10px] bg-[#E6F4EA] flex items-center justify-center text-[#137333] shrink-0">
                                    <Building2 className="w-4 h-4 stroke-[2]" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[11px] font-medium text-[#99A1AF]">Active Loans</span>
                                    <span className="text-[16px] font-bold text-[#101828]">3</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-[38px] h-[38px] rounded-[10px] bg-[#FCE8E6] flex items-center justify-center text-[#C5221F] shrink-0">
                                    <Clock className="w-4 h-4 stroke-[2]" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[11px] font-medium text-[#99A1AF]">Upcoming Due</span>
                                    <span className="text-[16px] font-bold text-[#101828]">$10,400</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-[38px] h-[38px] rounded-[10px] bg-[#FEF7E0] flex items-center justify-center text-[#B06000] shrink-0">
                                    <TrendingUp className="w-4 h-4 stroke-[2.5]" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[11px] font-medium text-[#99A1AF]">Debt-to-Income</span>
                                    <span className="text-[16px] font-bold text-[#101828]">28.4%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#FFF9F2] border border-[#FFE8D1] rounded-[16px] p-5 flex flex-col gap-3">
                        <div className="flex items-center gap-2 text-[#D97706] font-bold text-[14px]">
                            <Bell className="w-4 h-4 fill-[#D97706]/10" />
                            <span>Payment Reminder</span>
                        </div>

                        <p className="text-[12px] text-[#D97706]/90 leading-relaxed font-medium">
                            You have 3 upcoming installments totaling $10,400 due on Apr 1, 2026.
                        </p>

                        <button className="w-full h-[42px] bg-[#FF9500] hover:bg-[#E68600] text-white text-[13px] font-bold rounded-[10px] flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm mt-1">
                            <Send className="w-4 h-4 transform -rotate-45" />
                            <span>Send Payment Reminder</span>
                        </button>
                    </div>

                </div>

            </div>


            <div className="bg-white border border-[#EAEAEA] rounded-[16px] p-6 shadow-sm flex flex-col gap-4">
                <div className="flex items-center justify-between pb-2">
                    <h3 className="text-[16px] font-bold text-[#101828]">Recent Purchases</h3>
                    <div className="flex items-center gap-2">
                        <select className="h-8 text-[12px] border border-[#EAEAEA] rounded-[8px] px-2 text-[#64748B] bg-white outline-none">
                            <option>Last 30 days</option>
                        </select>
                        <button className="h-8 px-3 text-[12px] font-medium border border-[#EAEAEA] rounded-[8px] text-[#64748B] hover:bg-slate-50">
                            More Filters
                        </button>
                    </div>
                </div>
                <SharedTable data={purchasesData} columns={purchaseColumns} onRowClick={onPurchaseRowClick} />
            </div>

            <div className="bg-white border border-[#EAEAEA] rounded-[16px] p-6 shadow-sm flex flex-col gap-4">
                <div className="flex items-center justify-between pb-2">
                    <h3 className="text-[16px] font-bold text-[#101828]">Active Loans</h3>
                    <button className="text-[13px] font-bold text-[#1D4ED8] hover:underline flex items-center gap-1">
                        View All &rarr;
                    </button>
                </div>
                <SharedTable data={loansData} columns={loanColumns} showFilters={false} onRowClick={onLoanRowClick} />
            </div>

            <div className="bg-white border border-[#EAEAEA] rounded-[16px] p-6 shadow-sm flex flex-col gap-4">
                <div className="flex items-center justify-between pb-2">
                    <h3 className="text-[16px] font-bold text-[#101828]">Private Debts & Credits</h3>
                    <button className="text-[13px] font-bold text-[#1D4ED8] hover:underline flex items-center gap-1">
                        View All &rarr;
                    </button>
                </div>
                <SharedTable data={debtsData} columns={debtColumns} showFilters={false} onRowClick={onDebtRowClick} />
            </div>

        </div>
    );
}
