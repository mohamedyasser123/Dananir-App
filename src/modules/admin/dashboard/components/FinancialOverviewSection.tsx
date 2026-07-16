import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { LOAN_STATUS_STYLES } from "../constants/dashboard.constants";
import type { RevenuePoint, LoanRequest } from "../types/dashboard.types";

interface FinancialOverviewSectionProps {
  revenueChart: RevenuePoint[];
  loanRequests: LoanRequest[];
}

export default function FinancialOverviewSection({ revenueChart, loanRequests }: FinancialOverviewSectionProps) {
  const [timeframe, setTimeframe] = useState<"weekly" | "monthly">("monthly");

  return (
    <div className="w-full px-6 py-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">

        <div className="lg:col-span-8 bg-white rounded-[15px] border border-[#EAEAEA] p-6 flex flex-col justify-between min-h-[480px]">

          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[18px] font-bold text-slate-900">Financial Overview</h3>

            <div className="flex bg-[#F9FAFB] px-1  rounded-[10px]">
              <button
                onClick={() => setTimeframe("weekly")}
                className={`px-3 py-1.5 text-[13px] font-semibold rounded-[8px] transition-all duration-200 ${
                  timeframe === "weekly"
                    ? "bg-white text-slate-800 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Weekly
              </button>
              <button
                onClick={() => setTimeframe("monthly")}
                className={`px-3 py-1.5 text-[13px] font-semibold rounded-[8px] transition-all duration-200 ${
                  timeframe === "monthly"
                    ? "bg-white text-slate-800 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Monthly
              </button>
            </div>
          </div>

          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueChart} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="#F1F5F9" strokeDasharray="3 3" />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#99A1AF", fontSize: 13, fontWeight: 500 }}
                  dy={10}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#99A1AF", fontSize: 13, fontWeight: 500 }}
                  ticks={[0, 75000, 150000, 225000, 300000]}
                  tickFormatter={(value) => `$${value / 1000}k`}
                  dx={-10}
                />

                <Tooltip
                  formatter={(value) => [`$${Number(value).toLocaleString()}`]}
                  contentStyle={{ backgroundColor: "#fff", borderRadius: "10px", borderColor: "#EAEAEA" }}
                />

                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#2C4F93"
                  strokeWidth={2.5}
                  dot={{ r: 4.5, fill: "#2C4F93", stroke: "#fff", strokeWidth: 1.5 }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />

                <Line
                  type="monotone"
                  dataKey="loans"
                  stroke="#10B981"
                  strokeWidth={2.5}
                  dot={{ r: 4.5, fill: "#10B981", stroke: "#fff", strokeWidth: 1.5 }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#2C4F93]" />
              <span className="text-[13px] font-semibold text-slate-700">Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#10B981]" />
              <span className="text-[13px] font-semibold text-slate-700">Loans</span>
            </div>
          </div>

        </div>

        <div className="lg:col-span-4 bg-white rounded-[15px] border border-[#EAEAEA] p-6 flex flex-col justify-between min-h-[480px]">

          <h3 className="text-[18px] font-bold text-slate-900 mb-5">Recent Loan Requests</h3>

          <div className="flex-1 flex flex-col justify-between">
            <div className="grid grid-cols-12 text-[12px] font-bold text-[#99A1AF] tracking-wider pb-3 border-b border-[#F3F4F6]">
              <span className="col-span-5 text-left">CUSTOMER</span>
              <span className="col-span-4 text-center">AMOUNT</span>
              <span className="col-span-3 text-right">STATUS</span>
            </div>

            <div className="flex-1 flex flex-col justify-between pt-2">
              {loanRequests.map((request) => (
                <div key={request.id} className="grid grid-cols-12 items-center text-[14px] py-1">
                  <span className="col-span-5 text-[#101828] font-semibold truncate">
                    {request.customerName}
                  </span>

                  <span className="col-span-4 text-[#101828] font-bold text-center">
                    {request.amount}
                  </span>

                  <div className="col-span-3 flex justify-end">
                    <span className={`px-3 py-1 text-[12px] font-bold rounded-[8px] text-center min-w-[76px] ${LOAN_STATUS_STYLES[request.status]}`}>
                      {request.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
