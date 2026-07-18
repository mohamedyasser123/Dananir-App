import type { Subscription } from "../../types/membership.types";

interface RecentSubscriptionsProps {
  subscriptions: Subscription[];
}

export default function RecentSubscriptions({ subscriptions }: RecentSubscriptionsProps) {
  return (
    <div className="w-full bg-white rounded-[16px] border border-[#EAEAEA] !p-6 max-w-[1400px] mx-auto shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
      {/* عنوان السكشن الجانبي */}
      <h2 className="text-[#101828] text-[16px] font-bold !mb-5 tracking-tight">
        Recent Subscriptions
      </h2>

      {/* قائمة الـ Cards المترتبة تحت بعضها */}
      <div className="flex flex-col gap-3">
        {subscriptions.map((sub) => (
          <div
            key={sub.id}
            className="w-full bg-white border border-[#F2F4F7] rounded-[12px] !p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.01)]"
          >
            {/* الجزء الأيسر: الصورة والنصوص */}
            <div className="flex items-center gap-3.5">
              {/* الـ Avatar الدائري الأزرق */}
              <div className="w-11 h-11 rounded-full bg-[#1A68F5] text-white flex items-center justify-center text-[14px] font-bold tracking-wider shrink-0">
                {sub.initials}
              </div>

              {/* الاسم والبلان والتاريخ */}
              <div className="flex flex-col gap-0.5">
                <h4 className="text-[#101828] text-[14px] font-semibold leading-tight">
                  {sub.name}
                </h4>
                <p className="text-[#667085] text-[12px] font-medium leading-normal flex items-center gap-1.5">
                  <span>{sub.plan}</span>
                  <span className="text-[#D0D5DD] text-[10px]">•</span>
                  <span className="text-[#667085]/80">{sub.date}</span>
                </p>
              </div>
            </div>

            {/* الجزء الأيمن: السعر الأخضر الصريح */}
            <div className="text-[#00A63E] text-[15px] font-bold tracking-tight px-2">
              {sub.price}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}