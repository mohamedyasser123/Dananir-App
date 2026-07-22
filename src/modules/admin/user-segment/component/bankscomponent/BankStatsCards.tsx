import { Building2, Plus, AlertCircle, Trash2 } from "lucide-react";
import React from "react";

const statsData = [
  {
    id: 1,
    title: "TOTAL BANKS",
    value: "320",
    icon: <Building2 className="w-5 h-5 text-white" />,
    bgGradient: "from-[#3B82F6] via-[#60A5FA] to-[#DBEAFE]",
    iconBg: "bg-[#1E40AF]",
    textColor: "text-[#0F172A]"
  },
  {
    id: 2,
    title: "ACTIVE BANKS",
    value: "250",
    icon: <Plus className="w-5 h-5 text-white stroke-[3]" />,
    bgGradient: "from-[#10B981] via-[#34D399] to-[#D1FAE5]",
    iconBg: "bg-[#065F46]",
    textColor: "text-[#0F172A]"
  },
  {
    id: 3,
    title: "PENDING BANKS",
    value: "70",
    icon: <AlertCircle className="w-5 h-5 text-white" />,
    bgGradient: "from-[#F97316] via-[#FB923C] to-[#FFEDD5]",
    iconBg: "bg-[#C2410C]",
    textColor: "text-[#0F172A]"
  },
  {
    id: 4,
    title: "DELETES/REJECTED",
    value: "15",
    icon: <Trash2 className="w-5 h-5 text-white" />,
    bgGradient: "from-[#EF4444] via-[#F87171] to-[#FEE2E2]",
    iconBg: "bg-[#991B1B]",
    textColor: "text-[#0F172A]"
  }
];

export default function BankStatsCards() {
  return (
    <div className="w-full !px-25 !py-4">
<div className="grid grid-cols-5 sm:grid-cols-2 lg:grid-cols-4 gap-10 w-full">
  {statsData.map((card) => (
    <div
      key={card.id}
      className={`w-full bg-gradient-to-br ${card.bgGradient} rounded-[20px] !p-4 !pb-5 flex flex-col justify-between h-[150px] relative overflow-hidden shadow-[0_1px_2px_-1px_rgba(0,0,0,0.1),0_1px_3px_0_rgba(0,0,0,0.1)]`}
    >
      <div className="absolute top-0 right-0 w-[80px] h-[80px] bg-white/15 rounded-full translate-x-3 -translate-y-3 pointer-events-none" />

      <div className="flex w-full justify-start">
        <div className={`w-[38px] h-[38px] ${card.iconBg} rounded-[10px] flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.12)]`}>
          {React.cloneElement(card.icon, { className: "w-4 h-4 text-white" })}
        </div>
      </div>

      {/* النصوص */}
      <div className="flex flex-col gap-0.5 z-10">
        <span className="text-[11px] font-extrabold tracking-wider text-black/60 uppercase">
          {card.title}
        </span>
        <h2 className={`text-[30px] font-extrabold tracking-tight ${card.textColor} leading-none`}>
          {card.value}
        </h2>
      </div>
    </div>
  ))}
</div>
    </div>
  );
}