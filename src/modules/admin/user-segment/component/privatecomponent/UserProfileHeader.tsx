import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
  Download,
  Edit3,
  ShoppingCart,
  Banknote,
  TrendingUp,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

export default function UserProfileHeader() {
  return (
    <div className="w-full bg-[#FAFAFA] p-6 font-sans flex flex-col gap-8 text-[#101828]">
      
      <div className="flex flex-col lg:flex-row justify-between gap-8 items-start">
        
        <div className="flex-1 flex flex-col gap-6 w-full">
          
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-[56px] h-[56px] rounded-full bg-[#1E3A75] text-white font-bold text-[18px] flex items-center justify-center shrink-0">
                AH
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-[20px] font-bold text-[#101828]">
                    Ahmed Mohamed Hassan
                  </h2>
                  <span className="px-2.5 py-0.5 text-[12px] font-semibold bg-[#E6F4EA] text-[#137333] rounded-full flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#137333]" />
                    Active
                  </span>
                </div>
                <p className="text-[13px] text-[#667085]">
                  Member since January 2020 · Premium Account
                </p>
              </div>
            </div>

            <button className="h-[38px] px-4 bg-white border border-[#EAEAEA] hover:bg-slate-50 text-[#344054] text-[13px] font-semibold rounded-[10px] flex items-center gap-2 cursor-pointer shadow-sm transition-colors">
              <Edit3 className="w-4 h-4 text-[#667085]" />
              <span>Edit</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-[13px] text-[#667085]">
            <div className="flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-[#99A1AF]" />
              <span>ahmed.hassan@email.com</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-[#99A1AF]" />
              <span>+20 100 234 5678</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#99A1AF]" />
              <span>Cairo, Egypt</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#99A1AF]" />
              <span>DOB: May 15, 1990</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-1">
            <h4 className="text-[12px] font-bold text-[#667085] tracking-wider uppercase">
              Uploaded Documents
            </h4>

            <div className="flex flex-wrap items-center gap-3">
              <div className="h-[44px] px-3.5 bg-white border border-[#EAEAEA] rounded-[10px] flex items-center gap-3 text-[13px] font-medium text-[#344054] hover:border-slate-300 transition-colors cursor-pointer">
                <FileText className="w-4 h-4 text-[#1E3A75]" />
                <span>Passport_AV_2024.pdf</span>
                <Download className="w-4 h-4 text-[#99A1AF] ml-2" />
              </div>

              <div className="h-[44px] px-3.5 bg-white border border-[#EAEAEA] rounded-[10px] flex items-center gap-3 text-[13px] font-medium text-[#344054] hover:border-slate-300 transition-colors cursor-pointer">
                <FileText className="w-4 h-4 text-[#1E3A75]" />
                <span>Utility_Bill_March.pdf</span>
                <Download className="w-4 h-4 text-[#99A1AF] ml-2" />
              </div>

              <div className="h-[44px] px-3.5 bg-white border border-[#EAEAEA] rounded-[10px] flex items-center gap-3 text-[13px] font-medium text-[#344054] hover:border-slate-300 transition-colors cursor-pointer">
                <FileText className="w-4 h-4 text-[#1E3A75]" />
                <span>Tax_Return_2023.pdf</span>
                <Download className="w-4 h-4 text-[#99A1AF] ml-2" />
              </div>
            </div>
          </div>

        </div>

        <div className="w-full lg:w-[380px] grid grid-cols-2 gap-y-5 gap-x-4 bg-white/50 p-2 rounded-[16px]">
          <div>
            <span className="text-[11px] font-bold text-[#667085] uppercase tracking-wider block mb-1">
              Full Name
            </span>
            <p className="text-[14px] font-bold text-[#101828]">Alexander Vance</p>
          </div>

          <div>
            <span className="text-[11px] font-bold text-[#667085] uppercase tracking-wider block mb-1">
              Mobile
            </span>
            <p className="text-[14px] font-bold text-[#101828]">+1 (555) 092-8831</p>
          </div>

          <div className="col-span-2">
            <span className="text-[11px] font-bold text-[#667085] uppercase tracking-wider block mb-1">
              Email Address
            </span>
            <p className="text-[14px] font-bold text-[#101828] break-all">
              a.vance@enterprise-tech.com
            </p>
          </div>

          <div>
            <span className="text-[11px] font-bold text-[#667085] uppercase tracking-wider block mb-1">
              Job Title / Work
            </span>
            <p className="text-[14px] font-bold text-[#101828] leading-snug">
              Senior Systems Architect
            </p>
          </div>

          <div>
            <span className="text-[11px] font-bold text-[#667085] uppercase tracking-wider block mb-1">
              Salary (Annual)
            </span>
            <p className="text-[14px] font-bold text-[#101828]">$145,000</p>
          </div>
        </div>

      </div>


      {/* ================= 2. القسم السفلي: كروت الإحصائيات المالية ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* 1. الكارت الكحلي الداكن المميز (Total Purchases) */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#1E3A75] to-[#12254B] text-white rounded-[16px] p-5 shadow-sm flex flex-col justify-between min-h-[135px]">
          {/* خلفية شبه دائرية مموهة على اليمين لتطابق التصميم */}
          <div className="absolute -right-6 -top-6 w-28 h-28 bg-white/10 rounded-full blur-sm pointer-events-none" />

          <div className="flex items-start justify-between relative z-10">
            <span className="text-[13px] font-medium text-slate-200">Total Purchases</span>
            <div className="w-[38px] h-[38px] rounded-[10px] bg-white/15 flex items-center justify-center text-white backdrop-blur-md">
              <ShoppingCart className="w-4 h-4" />
            </div>
          </div>

          <div className="flex flex-col gap-1 relative z-10">
            <span className="text-[28px] font-bold tracking-tight">$5,710</span>
            <div className="flex items-center gap-1 text-[12px] text-[#A7F3D0]">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>12.4% vs last month</span>
            </div>
          </div>
        </div>

        {/* 2. كارت إجمالي الديون (Total Debts) */}
        <div className="bg-white border border-[#EAEAEA] rounded-[16px] p-5 shadow-[0_1px_2px_rgba(0,0,0,0.01)] flex flex-col justify-between min-h-[135px]">
          <div className="flex items-start justify-between">
            <span className="text-[13px] font-semibold text-[#667085]">Total Debts</span>
            <div className="w-[38px] h-[38px] rounded-[10px] bg-[#EEF2F6] flex items-center justify-center text-[#2C4F93]">
              <Banknote className="w-4 h-4" />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[28px] font-bold text-[#101828] tracking-tight">$599,200</span>
            <div className="flex items-center gap-1 text-[12px] text-[#EF4444]">
              <ArrowDownRight className="w-3.5 h-3.5" />
              <span>3 active loans</span>
            </div>
          </div>
        </div>

        {/* 3. كارت الديون المدفوعة (Paid Debts) */}
        <div className="bg-white border border-[#EAEAEA] rounded-[16px] p-5 shadow-[0_1px_2px_rgba(0,0,0,0.01)] flex flex-col justify-between min-h-[135px]">
          <div className="flex items-start justify-between">
            <span className="text-[13px] font-semibold text-[#667085]">Paid Debts</span>
            <div className="w-[38px] h-[38px] rounded-[10px] bg-[#EEF2F6] flex items-center justify-center text-[#2C4F93]">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[28px] font-bold text-[#101828] tracking-tight">$284,000</span>
            <div className="flex items-center gap-1 text-[12px] text-[#10B981]">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>On track</span>
            </div>
          </div>
        </div>

        {/* 4. كارت الأقساط المستحقة (Due Payments) */}
        <div className="bg-white border border-[#EAEAEA] rounded-[16px] p-5 shadow-[0_1px_2px_rgba(0,0,0,0.01)] flex flex-col justify-between min-h-[135px]">
          <div className="flex items-start justify-between">
            <span className="text-[13px] font-semibold text-[#667085]">Due Payments</span>
            <div className="w-[38px] h-[38px] rounded-[10px] bg-[#EEF2F6] flex items-center justify-center text-[#2C4F93]">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[28px] font-bold text-[#101828] tracking-tight">$10,400/mo</span>
            <div className="flex items-center gap-1 text-[12px] text-[#EF4444]">
              <ArrowDownRight className="w-3.5 h-3.5" />
              <span>3 installments</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}