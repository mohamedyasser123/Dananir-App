import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from "recharts";

// الداتا بالأرقام والألوان المطابقة للصورة بالظبط
const data = [
  { name: "Technology", value: 46, color: "#2C4F93" }, // الكحلي الأساسي بتاعك
  { name: "Agriculture", value: 38, color: "#10B981" }, // الأخضر
  { name: "Construction", value: 31, color: "#F97316" }, // البرتقالي
  { name: "Healthcare", value: 27, color: "#EC4899" }, // البينك
  { name: "Retail", value: 21, color: "#A855F7" }, // البنفسجي
  { name: "Travel", value: 17, color: "#6366F1" }, // الأزرق الفاتح
];

export default function CompaniesByCategoryChart() {
  return (
    <div className="w-full bg-white rounded-[16px] border border-[#EAEAEA] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
      {/* الهيدر: العناوين */}
      <div className="flex flex-col mb-8">
        <h3 className="text-[20px] font-bold text-[#101828] tracking-tight">
          Companies by Category
        </h3>
        <span className="text-[14px] text-[#99A1AF] mt-1 font-regular">
          Distribution and growth trends
        </span>
      </div>

      {/* منطقة الشارت التجاوبية */}
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            barSize={90} // عرض الشريط مريح ومطابق للشكل
          >
            {/* الخطوط الخلفية الأفقية المنقطة */}
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false} 
              stroke="#EAEAEA" 
            />
            
            {/* المحور الأفقي (الأسماء) */}
            <XAxis 
              dataKey="name" 
              axisLine={{ stroke: "#99A1AF", strokeWidth: 1 }}
              tickLine={false}
              tick={{ fill: "#667085", fontSize: 13, fontWeight: 500 }}
              dy={10}
            />
            
            {/* المحور الرأسي (الأرقام من 0 لـ 60) */}
            <YAxis 
              domain={[0, 60]} 
              ticks={[0, 15, 30, 45, 60]}
              axisLine={{ stroke: "#99A1AF", strokeWidth: 1 }}
              tickLine={false}
              tick={{ fill: "#667085", fontSize: 13 }}
              dx={-5}
            />

            {/* الأشرطة مع تلوين كل شريط بلونه وتدوير الحواف العلوية */}
            <Bar 
              dataKey="value" 
              radius={[12, 12, 0, 0]} // تدوير الحواف العلوية فقط بالملي زي الصورة
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}