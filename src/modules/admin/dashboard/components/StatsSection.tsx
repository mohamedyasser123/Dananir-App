import { STAT_CARD_STYLES } from "../constants/dashboard.constants"
import type { StatCardData } from "../types/dashboard.types"

interface StatsSectionProps {
  stats: StatCardData[]
}

export default function StatsSection({ stats }: StatsSectionProps) {
  return (
    <div className="w-full px-6 py-4">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5 w-full">
        {stats.map((stat) => {
          const { icon: Icon, gradient, iconColor } = STAT_CARD_STYLES[stat.id]

          return (
            <div
              key={stat.id}
              className={`flex flex-col justify-between p-6 h-44 rounded-[15px] text-white border border-[#EAEAEA] shadow-sm transition-all duration-200 hover:shadow-md ${gradient}`}            >
              <div className="flex items-start justify-between">
                <span className="text-[17px] font-semibold text-white/95 mt-1">{stat.title}</span>
                <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-white shadow-sm shrink-0">
                  <Icon className={`h-6 w-6 ${iconColor}`} />
                </div>
              </div>

              <div className="mt-auto space-y-1">
                <h3 className={`text-[34px] font-bold leading-none tracking-tight text-[#0F172A]`}>
                  {stat.value}
                </h3>

                {stat.trend && (
                  <div className="flex items-center gap-1.5 text-xs font-semibold">
                    <span
                      className={
                        stat.trend.direction === "up" ? "text-[#00A63E]" : "text-[#EF4444]"
                      }
                    >
                      {stat.trend.value}
                    </span>
                    <span className="text-[#EFF6FF] text-[14px]">vs last month</span>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
