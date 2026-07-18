import { Crown, Check, Users } from "lucide-react";
import type { MembershipPlan } from "../../types/membership.types";

interface PricingSectionProps {
  plans: MembershipPlan[];
  onManagePlan?: (plan: MembershipPlan) => void;
}

export default function PricingSection({ plans, onManagePlan }: PricingSectionProps) {
  return (
    <div className="w-full bg-[#FAFAFA] !py-12 !px-6">
      {/* شبكة توزيع الكروت الأربعة متجاوبة بالكامل */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch max-w-[1400px] mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`bg-white rounded-[20px] flex flex-col justify-between overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] relative transition-all duration-300 ${
              plan.isPopular 
                ? "border-2 border-[#1A68F5] md:-translate-y-2" 
                : "border border-[#EAEAEA]"
            }`}
          >
            {/* الجزء العلوي (الهيدر الملون) */}
            <div className={`${plan.headerBg} !p-6 text-white relative`}>
              {/* شارة MOST POPULAR للكارت المختار */}
              {plan.isPopular && (
                <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-white/20 text-white font-extrabold text-[10px] tracking-widest uppercase !px-3 !py-0.5 rounded-full backdrop-blur-sm">
                  Most Popular
                </div>
              )}
              
              <div className={`flex flex-col ${plan.isPopular ? "!mt-4" : ""}`}>
                <Crown className="w-6 h-6 opacity-90 mb-2" />
                <h3 className="text-[22px] font-bold tracking-tight mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-[34px] font-extrabold tracking-tight">{plan.price}</span>
                  <span className="text-[12px] opacity-70">/month</span>
                </div>
              </div>
            </div>

            {/* الجزء السفلي (المحتويات والمميزات) */}
            <div className="!p-6 flex-1 flex flex-col justify-between bg-white">
              <div>
                {/* حتة الـ Active Users مع خط الفصل */}
                <div className="flex items-center gap-2.5 !mb-5">
                  <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 font-medium leading-none mb-0.5">Active Users</p>
                    <p className="text-[15px] text-slate-800 font-bold leading-none">{plan.activeUsers}</p>
                  </div>
                </div>

                <hr className="border-[#EAEAEA] !mb-5" />

                {/* قائمة المميزات */}
                <p className="text-[11px] font-bold text-slate-400 tracking-wider uppercase !mb-4">Features</p>
                <ul className="space-y-3.5 !mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-[13px] text-slate-600 font-medium">
                      <Check className="w-4 h-4 text-[#00A63E] stroke-[3] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* زرار الـ Action (أصفر للمميز، ورمادي خفيف للباقي) */}
              <div>
                {plan.isPopular ? (
                  <button
                    onClick={() => onManagePlan?.(plan)}
                    className="w-full bg-[#FFD600] hover:bg-[#E6C200] text-black font-extrabold text-[14px] !py-3 rounded-[12px] shadow-[0_4px_12px_rgba(255,214,0,0.2)] transition-all cursor-pointer"
                  >
                    Manage Plan
                  </button>
                ) : (
                  <button
                    onClick={() => onManagePlan?.(plan)}
                    className="w-full bg-[#F1F3F5] hover:bg-[#E2E6EA] text-slate-700 font-bold text-[14px] !py-3 rounded-[12px] transition-all cursor-pointer"
                  >
                    Manage Plan
                  </button>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}