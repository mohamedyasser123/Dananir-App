import { Building2, Landmark, Users, TrendingUp, DollarSign, Clock, Sparkles } from "lucide-react";

const statsData = [
    {
        id: 1,
        icon: Building2,
        value: "1,284",
        label: "COMPANIES",
        subtext: "vs 1,146 last month",
        badge: "+12%",
        badgeType: "positive",
        iconBg: "bg-[#EEF2F6]",
        iconColor: "text-[#2C4F93]"
    },
    {
        id: 2,
        icon: Landmark,
        value: "42",
        label: "BANKS",
        subtext: "Steady growth rate",
        badge: "0%",
        badgeType: "neutral",
        iconBg: "bg-[#FFF7ED]",
        iconColor: "text-[#EA580C]"
    },
    {
        id: 3,
        icon: Users,
        value: "8,920",
        label: "TOTAL USERS",
        subtext: "vs 8,259 last month",
        badge: "+8%",
        badgeType: "positive",
        iconBg: "bg-[#F3E8FF]",
        iconColor: "text-[#9333EA]"
    },
    {
        id: 4,
        icon: TrendingUp,
        value: "$612K",
        label: "TOTAL SALES",
        subtext: "Exceeding Q2 targets",
        badge: "+22%",
        badgeType: "positive",
        iconBg: "bg-[#DCFCE7]",
        iconColor: "text-[#16A34A]"
    },
    {
        id: 5,
        icon: DollarSign,
        value: "$142.8K",
        label: "TOTAL LOAN",
        subtext: "Due to infrastructure spend",
        badge: "-5%",
        badgeType: "negative",
        iconBg: "bg-[#EFF6FF]",
        iconColor: "text-[#2563EB]"
    },
    {
        id: 6,
        icon: Clock,
        value: "3,450",
        label: "WEEKLY HOURS",
        subtext: "Aggregate team uptime",
        badge: "+2h",
        badgeType: "positive",
        iconBg: "bg-[#F8FAFC]",
        iconColor: "text-[#475569]"
    }
];

export default function DashboardInsightsSection() {
    return (
        <div className="w-full !px-6 !py-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch w-full">

                <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                    {statsData.map((stat) => {
                        const IconComponent = stat.icon;
                        return (
                            <div
                                key={stat.id}
                                className="bg-white rounded-[16px] !p-5 flex flex-col justify-between shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] min-h-[190px] transition-all duration-200"              >
                                <div className="flex items-center justify-between w-full">
                                    <div className={`w-11 h-11 ${stat.iconBg} ${stat.iconColor} rounded-[12px] flex items-center justify-center shrink-0`}>
                                        <IconComponent className="w-5 h-5 stroke-[2.2]" />
                                    </div>

                                    <span className={`text-[12px] font-extrabold px-2.5 py-0.5 rounded-full ${stat.badgeType === "positive" ? "bg-[#ECFDF5] text-[#10B981]" :
                                        stat.badgeType === "negative" ? "bg-[#FEF2F2] text-[#EF4444]" :
                                            "bg-[#F8FAFC] text-[#99A1AF]"
                                        }`}>
                                        {stat.badge}
                                    </span>
                                </div>

                                <div className="space-y-1 mt-4">
                                    <div className="text-[28px] font-extrabold text-[#0D3B73] tracking-tight leading-none">
                                        {stat.value}
                                    </div>
                                    <div className="text-[11px] font-extrabold text-[#99A1AF] tracking-wider uppercase">
                                        {stat.label}
                                    </div>
                                    <p className="text-[12px] text-[#99A1AF] font-medium pt-0.5">
                                        {stat.subtext}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>


                <div className="lg:col-span-3 bg-gradient-to-r from-[#0C377A] to-[#2C4F93] text-white rounded-[32px] !p-6 flex flex-col justify-between shadow-md min-h-[420px]">

                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/10 rounded-[12px] flex items-center justify-center text-white">
                                <Sparkles className="w-5 h-5 fill-white/20" />
                            </div>
                            <h2 className="text-[18px] font-bold tracking-tight">Smart Insights</h2>
                        </div>

                        <ul className="space-y-5 text-[14px] font-medium leading-relaxed text-slate-100/90">
                            <li className="flex items-start gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#FFB054] shrink-0 mt-2" />
                                <p>
                                    User registrations increased by{" "}
                                    <span className="text-[#FFB054] font-bold">18%</span> this week, mostly from European sectors.
                                </p>
                            </li>

                            <li className="flex items-start gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#FFB054] shrink-0 mt-2" />
                                <p>
                                    Bank loans have the highest{" "}
                                    <span className="text-[#FFB054] font-bold">default rate</span> (4.2%) since last quarter.
                                </p>
                            </li>

                            <li className="flex items-start gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#FFB054] shrink-0 mt-2" />
                                <p>
                                    Peak activity happens on{" "}
                                    <span className="text-[#FFB054] font-bold">Tuesday</span> between 10 AM and 2 PM UTC.
                                </p>
                            </li>
                        </ul>
                    </div>

                    <button className="w-full h-[46px] border border-[#FFFFFF]/20 bg-[#FFFFFF]/10 hover:bg-[#FFFFFF]/15 text-white font-bold text-[14px] rounded-[14px] transition-all duration-200 shadow-sm mt-6">
                        View Full Analysis
                    </button>
                </div>

            </div>
        </div>
    );
}