import React from "react";

interface StatCardProps {
  title: string;
  value: number | string;
  valueColor: string;
}

function StatCard({ title, value, valueColor }: StatCardProps) {
  return (
    <div className="flex-1 min-w-[200px] bg-white border border-[#EAEAEA] rounded-[16px] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.01)] transition-all hover:shadow-md">
      <span className="text-[14px] font-medium text-[#667085] block mb-3">
        {title}
      </span>
      <span className={`text-[32px] font-bold block leading-none ${valueColor}`}>
        {value}
      </span>
    </div>
  );
}

export default function EmailStatsSection() {
  const stats = [
    { title: "Total Emails", value: 5, color: "text-[#101828]" },   
    { title: "Unread", value: 2, color: "text-[#1D4ED8]" },        
    { title: "Starred", value: 2, color: "text-[#D97706]" },       
    { title: "Sent Today", value: 12, color: "text-[#059669]" },  
  ];

  return (
    <div className="w-full bg-transparent py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            valueColor={stat.color}
          />
        ))}
      </div>
    </div>
  );
}