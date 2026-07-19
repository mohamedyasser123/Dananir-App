import React, { useState } from "react";
import { Send, ChevronDown, XCircle } from "lucide-react";
import type { CreateNotificationFormValues } from "../../schemas/communication.schema";

interface CreateNotificationDashboardProps {
  onSubmit: (values: CreateNotificationFormValues) => void;
  submitting?: boolean;
}

export default function CreateNotificationDashboard({ onSubmit, submitting }: CreateNotificationDashboardProps) {
  // حالات الفورم (Form States)
  const [title, setTitle] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, targetAudience, message });
    setTitle("");
    setTargetAudience("");
    setMessage("");
  };

  return (
    <div className="w-full min-h-screen bg-[#FAFAFA] p-6 font-sans flex flex-col gap-6">
      
      <form 
        onSubmit={handleSubmit}
        className="w-full bg-white border border-[#EAEAEA] rounded-[16px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.01)] flex flex-col gap-5"
      >
        <div className="flex items-center gap-2 text-[#2C4F93] font-semibold text-[14px]">
          <Send className="w-4 h-4 transform -rotate-45" />
          <span>Notifications</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-bold text-[#101828]">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="........."
              className="w-full h-[44px] px-4 text-[14px] text-slate-800 bg-white border border-[#EAEAEA] rounded-[10px] focus:outline-none focus:border-[#2C4F93] placeholder-[#99A1AF] transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-bold text-[#101828]">Target Audience</label>
            <div className="relative w-full">
              <select
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-full h-[44px] pl-4 pr-10 text-[14px] text-[#99A1AF] bg-white border border-[#EAEAEA] rounded-[10px] appearance-none focus:outline-none focus:border-[#2C4F93] cursor-pointer"
              >
                <option value="">Select</option>
                <option value="all">All Users</option>
                <option value="admins">Admins Only</option>
                <option value="premium">Premium Users</option>
              </select>
              <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-[#101828]">
                <ChevronDown className="w-5 h-5 stroke-[2]" />
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[14px] font-bold text-[#101828]">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder=",,,,,,,"
            rows={4}
            className="w-full p-4 text-[14px] text-slate-800 bg-white border border-[#EAEAEA] rounded-[10px] focus:outline-none focus:border-[#2C4F93] placeholder-[#99A1AF] transition-colors resize-none"
          />
        </div>

        <div className="flex justify-end mt-2">
          <button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-[160px] h-[44px] bg-[#2C4F93] hover:bg-[#1E3A75] text-white text-[14px] font-semibold rounded-[10px] shadow-sm transition-all duration-200 cursor-pointer flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? "Sending..." : "Send"}
          </button>
        </div>
      </form>

      <div className="w-full bg-white border border-[#EAEAEA] rounded-[16px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.01)] flex flex-col gap-4">
        <h3 className="text-[15px] font-bold text-[#101828]">Earlier</h3>

        <div className="w-full p-4 rounded-[12px] bg-white border border-[#F3F4F6] flex items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-[42px] h-[42px] rounded-[12px] bg-[#FCE8E6] flex items-center justify-center text-[#EA4335] shrink-0">
              <XCircle className="w-5 h-5 stroke-[2]" />
            </div>

            <div className="flex flex-col gap-0.5 min-w-0">
              <h4 className="text-[14px] font-bold text-[#101828] truncate">
                Failed Login Attempt
              </h4>
              <p className="text-[13px] text-[#667085] truncate">
                3 failed login attempts detected from IP 192.168.1.1
              </p>
            </div>
          </div>

          <span className="text-[12px] text-[#99A1AF] shrink-0 font-medium whitespace-nowrap pt-1 sm:pt-0">
            3 hours ago
          </span >
        </div>
      </div>

    </div>
  );
}