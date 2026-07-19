import { CheckCircle2, UserPlus, AlertCircle, ShoppingCart } from "lucide-react";
import type { Notification } from "../../types/communication.types";

interface RecentActivitiesProps {
  activities: Notification[];
}

export default function RecentActivities({ activities }: RecentActivitiesProps) {
  const renderIcon = (type: string) => {
    switch (type) {
      case "success":
        return (
          <div className="w-[42px] h-[42px] rounded-[12px] bg-[#E6F4EA] flex items-center justify-center text-[#137333] shrink-0">
            <CheckCircle2 className="w-5 h-5 stroke-[2]" />
          </div>
        );
      case "user":
        return (
          <div className="w-[42px] h-[42px] rounded-[12px] bg-[#E8F0FE] flex items-center justify-center text-[#1A73E8] shrink-0">
            <UserPlus className="w-5 h-5 stroke-[2]" />
          </div>
        );
      case "warning":
        return (
          <div className="w-[42px] h-[42px] rounded-[12px] bg-[#FEF7E0] flex items-center justify-center text-[#B06000] shrink-0">
            <AlertCircle className="w-5 h-5 stroke-[2]" />
          </div>
        );
      case "info":
        return (
          <div className="w-[42px] h-[42px] rounded-[12px] bg-[#E6F4EA] flex items-center justify-center text-[#137333] shrink-0">
            <ShoppingCart className="w-5 h-5 stroke-[2]" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full bg-white border border-[#EAEAEA] rounded-[16px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
      <h3 className="text-[16px] font-bold text-[#101828] mb-4">Recent</h3>

      <div className="flex flex-col gap-3">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className={`w-full p-4 rounded-[12px] border transition-all flex items-center justify-between gap-4 ${
              activity.isUnread
                ? "bg-[#F4F8FF] border-[#E0ECFF]" 
                : "bg-white border-[#EAEAEA] hover:bg-slate-50/50"
            }`}
          >
            <div className="flex items-center gap-4 min-w-0">
              {renderIcon(activity.type)}
              
              <div className="flex flex-col gap-0.5 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-[14px] font-bold text-[#101828] truncate">
                    {activity.title}
                  </h4>
                  {activity.isUnread && (
                    <span className="w-1.5 h-1.5 bg-[#1A73E8] rounded-full inline-block shrink-0 animate-pulse" />
                  )}
                </div>
                <p className="text-[13px] text-[#667085] truncate">
                  {activity.description}
                </p>
              </div>
            </div>

            <span className="text-[12px] text-[#99A1AF] shrink-0 font-medium whitespace-nowrap">
              {activity.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}