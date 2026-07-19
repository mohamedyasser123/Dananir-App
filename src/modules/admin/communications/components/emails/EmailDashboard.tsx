import { useState } from "react";
import { Search, Plus, Star, Paperclip, Trash2, Reply } from "lucide-react";
import type { Email } from "../../types/communication.types";
import { useToggleEmailStar } from "../../hooks/emails/useToggleEmailStar";
import { useDeleteEmail } from "../../hooks/emails/useDeleteEmail";

interface EmailDashboardProps {
  emails: Email[];
}

export default function EmailDashboard({ emails }: EmailDashboardProps) {
  const [selectedEmailId, setSelectedEmailId] = useState<string | undefined>(emails[0]?.id);
  const toggleStar = useToggleEmailStar();
  const deleteEmail = useDeleteEmail();

  const activeEmail = emails.find((email) => email.id === selectedEmailId) ?? emails[0];

  const handleDelete = (id: string) => {
    deleteEmail.mutate(id, {
      onSuccess: () => {
        if (id === selectedEmailId) {
          setSelectedEmailId(emails.find((email) => email.id !== id)?.id);
        }
      },
    });
  };

  return (
    <div className="flex w-full h-[calc(100vh-40px)] bg-[#FAFAFA] gap-6 p-6 font-sans">

      <div className="w-[340px] bg-white border border-[#EAEAEA] rounded-[16px] flex flex-col overflow-hidden shrink-0">

        <div className="p-4 flex items-center justify-between">
          <h2 className="text-[20px] font-bold text-[#101828]">Inbox</h2>
          <button className="text-[#EAB308] hover:bg-slate-50 p-1.5 rounded-lg transition-colors cursor-pointer">
            <Plus className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        <div className="px-4 pb-3">
          <div className="relative w-full">
            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-[#99A1AF]" />
            </span>
            <input
              type="text"
              placeholder="Search emails..."
              className="w-full h-[40px] pl-10 pr-4 text-[14px] bg-[#F9FAFB] border border-[#EAEAEA] rounded-[10px] focus:outline-none focus:border-[#1D4ED8] placeholder-[#99A1AF]"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {emails.map((email) => (
            <div
              key={email.id}
              onClick={() => setSelectedEmailId(email.id)}
              className={`flex flex-col gap-1 px-4 py-4 border-l-[3px] transition-all cursor-pointer border-b border-[#F9FAFB] ${
                email.id === selectedEmailId
                  ? "bg-[#EFF6FF] border-[#1D4ED8]"
                  : "bg-white border-transparent hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="font-bold text-[14px] text-[#101828] truncate">{email.sender}</span>
                  {email.starred && (
                    <Star className="w-3.5 h-3.5 fill-[#EAB308] text-[#EAB308] shrink-0" />
                  )}
                </div>
                <span className="text-[12px] text-[#99A1AF] shrink-0">{email.time}</span>
              </div>

              <h4 className="text-[13px] font-bold text-[#101828] truncate">{email.subject}</h4>

              <div className="flex items-center justify-between gap-2">
                <p className="text-[13px] text-[#667085] truncate flex-1">{email.preview}</p>
                {email.hasAttachment && (
                  <Paperclip className="w-3.5 h-3.5 text-[#99A1AF] shrink-0" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeEmail && (
        <div className="flex-1 bg-white border border-[#EAEAEA] rounded-[16px] flex flex-col overflow-hidden">

          <div className="p-6 border-b border-[#EAEAEA] flex flex-col gap-4 shrink-0">
            <div className="flex items-start justify-between">
              <h1 className="text-[20px] font-bold text-[#101828]">{activeEmail.subject}</h1>
              <div className="flex items-center gap-3 text-[#667085]">
                <button
                  onClick={() => toggleStar.mutate(activeEmail.id)}
                  className="hover:text-[#EAB308] transition-colors p-1 cursor-pointer"
                >
                  <Star className={`w-5 h-5 ${activeEmail.starred ? "fill-[#EAB308] text-[#EAB308]" : ""}`} />
                </button>
                <button
                  onClick={() => handleDelete(activeEmail.id)}
                  className="hover:text-red-500 transition-colors p-1 cursor-pointer"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-[44px] h-[44px] rounded-full bg-[#1D4ED8] text-white flex items-center justify-center font-bold text-[14px]">
                  {activeEmail.sender.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-[15px] text-[#101828]">{activeEmail.sender}</span>
                  <span className="text-[12px] text-[#667085]">{activeEmail.emailAddress}</span>
                </div>
              </div>
              <span className="text-[13px] text-[#667085]">{activeEmail.dateLabel}</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
            <div className="text-[15px] text-[#101828] leading-relaxed space-y-4">
              <p>{activeEmail.preview}</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>

            {/* سكشن المرفقات (Attachments) المتقفل شادون ونفس لون الصورة */}
            {activeEmail.hasAttachment && (
              <div className="mt-4 p-4 bg-[#F9FAFB] border border-[#EAEAEA] rounded-[12px] flex items-center justify-between max-w-[540px]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white border border-[#EAEAEA] rounded-[8px] flex items-center justify-center text-[#667085]">
                    <Paperclip className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-semibold text-[#101828]">Financial_Report_Q1.pdf</span>
                    <span className="text-[12px] text-[#667085]">2.4 MB</span>
                  </div>
                </div>
                <button className="h-[36px] px-4 bg-[#1D4ED8] hover:bg-[#1E3A75] text-white text-[13px] font-semibold rounded-[8px] transition-colors cursor-pointer">
                  Download
                </button>
              </div>
            )}

            <div className="flex items-center gap-3 mt-auto pt-6">
              <button className="h-[42px] px-5 bg-[#1D4ED8] hover:bg-[#1E3A75] text-white text-[14px] font-semibold rounded-[10px] flex items-center gap-2 shadow-sm transition-colors cursor-pointer">
                <Reply className="w-4 h-4 transform flip-x" />
                <span>Reply</span>
              </button>
              <button className="h-[42px] px-5 bg-white border border-[#EAEAEA] hover:bg-slate-50 text-[#475569] text-[14px] font-semibold rounded-[10px] flex items-center gap-2 transition-colors cursor-pointer">
                <span>Forward</span>
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
