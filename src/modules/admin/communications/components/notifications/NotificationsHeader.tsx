import { Bell } from "lucide-react";

interface NotificationsHeaderProps {
  unreadCount?: number;
  onMarkAllRead?: () => void;
  onSettingsClick?: () => void;
}

export default function NotificationsHeader({
  unreadCount = 4,
  onMarkAllRead,
  onSettingsClick,
}: NotificationsHeaderProps) {
  return (
    <div className="w-full bg-white px-2 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      
      <div className="flex items-start gap-3.5">
        <div className="text-[#101828] mt-1 shrink-0">
          <Bell className="w-6 h-6 stroke-[1.8]" />
        </div>
        
        <div className="flex flex-col gap-0.5">
          <h1 className="text-[20px] font-bold text-[#101828] leading-tight">
            Notifications
          </h1>
          <p className="text-[14px] text-[#667085]">
            You have <span className="font-bold text-[#475569]">{unreadCount} unread</span> notifications
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onMarkAllRead}
          className="h-[40px] px-4 bg-white border border-[#EAEAEA] hover:bg-slate-50 text-[#101828] text-[14px] font-semibold rounded-[10px] shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-colors cursor-pointer"
        >
          Mark All as Read
        </button>
        
        <button
          onClick={onSettingsClick}
          className="h-[40px] px-4 bg-white border border-[#EAEAEA] hover:bg-slate-50 text-[#101828] text-[14px] font-semibold rounded-[10px] shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-colors cursor-pointer"
        >
          Settings
        </button>
      </div>

    </div>
  );
}