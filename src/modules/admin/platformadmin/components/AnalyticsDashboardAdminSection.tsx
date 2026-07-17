import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { TrendingUp, ShieldCheck } from "lucide-react";

// ================= داتا الـ Donut Chart (القطاع الأيسر) =================
const entityData = [
  { name: "Users", value: 60, color: "#0D3B73" },      // كحلي داكن
  { name: "Companies", value: 30, color: "#D2E0FB" },  // أزرق فاتح جداً
  { name: "Banks", value: 10, color: "#FFBB70" },      // برتقالي هادئ
];

// ================= داتا الـ Customer Acquisition Cost (القطاع الأيمن العلوي) =================
const cacData = [
  { month: "JANUARY", cost: "$120", progress: 65 },
  { month: "FEBRUARY", cost: "$145", progress: 80 },
  { month: "MARCH", cost: "$180", progress: 95 },
  { month: "APRIL", cost: "$165", progress: 88 },
];

export default function AnalyticsDashboardAdminSection() {
  return (
    <div className="w-full !px-6 !py-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch w-full">
        
        <div className="lg:col-span-4 bg-white rounded-[24px] !p-6 flex flex-col justify-between shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] min-h-[450px]">
          <div>
            <h3 className="text-[18px] font-bold text-[#0D3B73] tracking-tight">
              Distribution of Entities
            </h3>
          </div>

          <div className="relative w-full h-[200px] flex items-center justify-center my-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={entityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                >
                  {entityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-[28px] font-extrabold text-[#0D3B73] tracking-tight leading-none">
                10.2K
              </span>
              <span className="text-[11px] font-bold text-[#99A1AF] tracking-wider uppercase mt-1">
                TOTAL
              </span>
            </div>
          </div>

          <div className="space-y-3 w-full">
            {entityData.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-[14px]">
                <div className="flex items-center gap-2.5">
                  <span 
                    className="w-3 h-3 rounded-full shrink-0" 
                    style={{ backgroundColor: item.color }} 
                  />
                  <span className="text-[#475569] font-semibold">{item.name}</span>
                </div>
                <span className="text-[#0D3B73] font-extrabold">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-8 flex flex-col gap-6 justify-between">
          
          <div className="bg-white rounded-[24px] !p-6 flex flex-col shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] flex-1 justify-between min-h-[310px]">
            <div className="flex items-center justify-between w-full mb-4">
              <h3 className="text-[17px] font-bold text-[#0D3B73] tracking-tight">
                Customer Acquisition Cost
              </h3>
              <div className="flex items-center gap-4 text-[11px] font-bold text-[#99A1AF]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-[3px] bg-[#E2E8F0]" />
                  <span>TARGET</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-[3px] bg-[#0D3B73]" />
                  <span>ACTUAL</span>
                </div>
              </div>
            </div>

            <div className="space-y-5 flex-1 flex flex-col justify-center">
              {cacData.map((row, idx) => (
                <div key={idx} className="space-y-1.5 w-full">
                  <div className="flex items-center justify-between text-[12px] font-bold tracking-wide">
                    <span className="text-[#64748B] uppercase">{row.month}</span>
                    <span className="text-[#0D3B73] font-extrabold">{row.cost}</span>
                  </div>
                  <div className="w-full h-2.5 bg-[#F8FAFC] rounded-full relative overflow-hidden">
                    <div 
                      className="h-full bg-[#0D3B73] rounded-full transition-all duration-500"
                      style={{ width: `${row.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-[24px] !p-5 grid grid-cols-1 md:grid-cols-2 gap-6 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]">
            
            <div className="flex items-center justify-between bg-transparent border-0 md:border-r border-[#F1F5F9] last:border-r-0 md:pr-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#F0FDF4] text-[#16A34A] flex items-center justify-center rounded-[16px]">
                  <TrendingUp className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-[#99A1AF] tracking-wider uppercase">
                    WEEKLY USER GROWTH
                  </span>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-[22px] font-extrabold text-[#0D3B73] tracking-tight leading-none">
                      +1,240
                    </span>
                    <span className="text-[#16A34A] text-[14px] font-extrabold">↑</span>
                  </div>
                </div>
              </div>
              <div className="flex items-end gap-1 h-8 pr-2">
                <span className="w-5 h-3 bg-[#10B981]/20 rounded-[3px]" />
                <span className="w-5 h-5 bg-[#10B981]/30 rounded-[3px]" />
                <span className="w-5 h-4 bg-[#10B981]/40 rounded-[3px]" />
                <span className="w-5 h-7 bg-[#10B981]/60 rounded-[3px]" />
                <span className="w-5 h-6 bg-[#10B981] rounded-[3px]" />
              </div>
            </div>

            <div className="flex items-center justify-between bg-transparent">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center rounded-[16px]">
                  <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-[#99A1AF] tracking-wider uppercase">
                    ACTIVE SESSIONS
                  </span>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-[22px] font-extrabold text-[#0D3B73] tracking-tight leading-none">
                      4,821
                    </span>
                    <span className="text-[#2563EB] text-[12px] font-extrabold">~</span>
                  </div>
                </div>
              </div>
              <div className="flex items-end gap-1 h-8 pr-2">
                <span className="w-5 h-3 bg-[#2563EB]/10 rounded-[3px]" />
                <span className="w-5 h-4 bg-[#2563EB]/20 rounded-[3px]" />
                <span className="w-5 h-7 bg-[#2563EB]/40 rounded-[3px]" />
                <span className="w-5 h-5 bg-[#2563EB]/60 rounded-[3px]" />
                <span className="w-5 h-6 bg-[#2563EB] rounded-[3px]" />
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}