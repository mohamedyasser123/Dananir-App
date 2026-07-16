import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { REVENUE_DISTRIBUTION_COLORS } from "../constants/dashboard.constants"
import { formatCompactCurrency, getRevenueSharePercentage, getTotalRevenue } from "../utils/dashboard.utils"
import type { TopMerchant, RevenueDistributionSlice } from "../types/dashboard.types"

interface AnalyticsSectionProps {
    topMerchants: TopMerchant[]
    revenueDistribution: RevenueDistributionSlice[]
}

export default function AnalyticsSection({ topMerchants, revenueDistribution }: AnalyticsSectionProps) {
    const totalRevenue = getTotalRevenue(revenueDistribution)

    return (
        <div className="w-full px-6 py-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">

                <div className="lg:col-span-3 bg-white rounded-[15px] border border-[#EAEAEA] p-6 flex flex-col justify-between min-h-[450px]">
                    <h3 className="text-[17px] font-bold text-slate-900 mb-6">Top Merchants</h3>

                    <div className="space-y-5 flex-1 flex flex-col justify-between">
                        {topMerchants.map((merchant) => (
                            <div key={merchant.id} className="flex items-start gap-2">

                                <span className="text-[#99A1AF] font-medium text-[14px] w-8 pt-0.5 shrink-0">
                                    {merchant.id}
                                </span>

                                <div className="flex-1 flex flex-col gap-2">
                                    <div className="flex items-center justify-between text-[14px]">
                                        <span className="text-[#101828] font-semibold truncate mr-2">
                                            {merchant.name}
                                        </span>
                                        <span className="text-[#101828] font-bold shrink-0">
                                            {merchant.amount}
                                        </span>
                                    </div>

                                    <div className="w-full h-2 rounded-full bg-[#F3F4F6] overflow-hidden">
                                        <div
                                            className="h-full bg-[#2C4F93] rounded-full transition-all duration-500"
                                            style={{ width: `${merchant.progress}%` }}
                                        />
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-6 bg-white rounded-[15px] border border-[#EAEAEA] p-6 flex flex-col items-center justify-between min-h-[450px]">
                    <h3 className="text-[17px] font-bold text-slate-900 self-start mb-2">Revenue Distribution</h3>

                    <div className="relative w-full h-56 flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={revenueDistribution}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={92}
                                    paddingAngle={3}
                                    dataKey="value"
                                >
                                    {revenueDistribution.map((entry) => (
                                        <Cell key={entry.category} fill={REVENUE_DISTRIBUTION_COLORS[entry.category]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>

                        <div className="absolute flex flex-col items-center justify-center text-center">
                            <span className="text-[32px] font-bold text-slate-800 leading-none">{formatCompactCurrency(totalRevenue)}</span>
                            <span className="text-[13px] text-slate-400 font-medium mt-1">Total</span>
                        </div>
                    </div>

                    <div className="w-full space-y-3.5 mt-4">
                        {revenueDistribution.map((slice) => (
                            <div key={slice.category} className="flex items-center justify-between text-[14px]">
                                <div className="flex items-center gap-3">
                                    <span className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: REVENUE_DISTRIBUTION_COLORS[slice.category] }} />
                                    <span className="text-slate-600 font-medium">{slice.label}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-slate-950 font-bold">${slice.value.toLocaleString()}</span>
                                    <span className="text-slate-400 font-medium w-12 text-right">{getRevenueSharePercentage(slice, revenueDistribution)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-3 bg-white rounded-[15px] border border-[#EAEAEA] p-6 flex flex-col justify-between min-h-[450px]">
                    <h3 className="text-[17px] font-bold text-slate-900 mb-6">Top Merchants</h3>

                     <div className="space-y-5 flex-1 flex flex-col justify-between">
                        {topMerchants.map((merchant) => (
                            <div key={merchant.id} className="flex items-start gap-1">

                                <span className="text-[#99A1AF] font-medium text-[14px] w-8 pt-0.5 shrink-0">
                                    {merchant.id}
                                </span>

                                <div className="flex-1 flex flex-col gap-2">
                                    <div className="flex items-center justify-between text-[14px]">
                                        <span className="text-[#101828] font-semibold truncate mr-2">
                                            {merchant.name}
                                        </span>
                                        <span className="text-[#101828] font-bold shrink-0">
                                            {merchant.amount}
                                        </span>
                                    </div>

                                    <div className="w-full h-2 rounded-full bg-[#F3F4F6] overflow-hidden">
                                        <div
                                            className="h-full bg-[#2C4F93] rounded-full transition-all duration-500"
                                            style={{ width: `${merchant.progress}%` }}
                                        />
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}
