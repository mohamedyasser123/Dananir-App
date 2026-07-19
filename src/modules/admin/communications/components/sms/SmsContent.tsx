import SmsSkeleton from "./SmsSkeleton"
import SmsError from "./SmsError"
import SmsEmpty from "./SmsEmpty"
import { isSmsEmpty } from "../../utils/communication.utils"
import type { UseSmsResult } from "../../hooks/sms/useSms"
import { useSendSms } from "../../hooks/sms/useSendSms"
import { useState } from "react"
import { MessageSquare, MessageCircle, Send, Clock, Search, Plus } from "lucide-react";
import SmsMessageDialog from "./SmsMessageDialog"
import type { Sms, SmsStatus } from "../../types/communication.types"

export default function SmsContent({ data, isLoading, isError, error, refetch }: UseSmsResult) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [template, setTemplate] = useState("");
  const [message, setMessage] = useState("");
  const [openMessage, setOpenMessage] = useState<Sms | null>(null);
  const sendSms = useSendSms();

  if (isLoading) return <SmsSkeleton />
  if (isError) return <SmsError message={error?.message} onRetry={refetch} />
  if (!data || isSmsEmpty(data)) return <SmsEmpty />

const getStatusStyle = (status: SmsStatus) => {
    switch (status) {
      case "DELIVERED":
        return "bg-[#E6F4EA] text-[#137333]";
      case "PENDING":
        return "bg-[#FEF7E0] text-[#B06000]";
      case "FAILED":
        return "bg-[#FCE8E6] text-[#C5221F]";
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  const handleSend = () => {
    if (!phoneNumber.trim() || !message.trim()) return;
    sendSms.mutate({ phone: phoneNumber.trim(), template, body: message.trim() });
    setPhoneNumber("");
    setTemplate("");
    setMessage("");
  };

 return (
    <div className="flex w-full min-h-screen bg-[#FAFAFA] gap-6 p-6 font-sans">

      <div className="w-[320px] bg-white border border-[#EAEAEA] rounded-[16px] p-5 flex flex-col gap-5 shrink-0 shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
        <div className="flex items-center gap-2.5 text-[#101828] font-bold text-[16px]">
          <MessageSquare className="w-5 h-5 text-[#2C4F93] fill-[#2C4F93]/10" />
          <span>Send SMS</span>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-bold text-[#475569]">Recipient Phone Number</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="+1 234 567 8900"
            className="w-full h-[42px] px-4 text-[14px] bg-white border border-[#EAEAEA] rounded-[10px] focus:outline-none focus:border-[#2C4F93] placeholder-[#99A1AF]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-bold text-[#475569]">Message Template</label>
          <input
            type="text"
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            className="w-full h-[42px] px-4 text-[14px] bg-white border border-[#EAEAEA] rounded-[10px] focus:outline-none focus:border-[#2C4F93]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-bold text-[#475569]">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            maxLength={160}
            rows={5}
            className="w-full p-4 text-[14px] bg-white border border-[#EAEAEA] rounded-[10px] focus:outline-none focus:border-[#2C4F93] placeholder-[#99A1AF] resize-none"
          />
          <span className="text-[12px] text-[#99A1AF] mt-0.5">
            {message.length} / 160 characters
          </span>
        </div>

        <div className="flex flex-col gap-3 mt-2">
          <button
            onClick={handleSend}
            disabled={sendSms.isPending}
            className="w-full h-[44px] bg-[#2C4F93] hover:bg-[#1E3A75] text-white text-[14px] font-semibold rounded-[10px] shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4 transform -rotate-45" />
            <span>{sendSms.isPending ? "Sending..." : "Send Message"}</span>
          </button>

          <button className="w-full h-[44px] bg-white border border-[#EAEAEA] hover:bg-slate-50 text-[#101828] text-[14px] font-semibold rounded-[10px] flex items-center justify-center gap-2 cursor-pointer transition-colors">
            <span>Schedule for Later</span>
          </button>
        </div>
      </div>

      <div className="flex-1 bg-white border border-[#EAEAEA] rounded-[16px] p-6 flex flex-col overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.01)]">

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[18px] font-bold text-[#101828]">Message History</h2>
          <button className="h-[36px] px-3.5 bg-white border border-[#EAEAEA] hover:bg-slate-50 text-[#101828] text-[13px] font-semibold rounded-[8px] flex items-center gap-1.5 cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            <Plus className="w-4 h-4 text-slate-500" />
            <span className="text-[13px] text-[#101828] flex items-center gap-1"><Plus className="w-3.5 h-3.5" /> Export</span>
          </button>
        </div>

        <div className="w-full mb-5">
          <div className="relative w-full">
            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-[#99A1AF]" />
            </span>
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full h-[40px] pl-10 pr-4 text-[14px] bg-white border border-[#EAEAEA] rounded-[10px] focus:outline-none focus:border-[#2C4F93] placeholder-[#99A1AF]"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto flex flex-col">
          {data.map((msg) => (
            <div
              key={msg.id}
              onClick={() => setOpenMessage(msg)}
              className="w-full py-4 border-b border-[#F4F4F4] last:border-0 flex items-start gap-4 transition-colors hover:bg-slate-50/40 px-2 rounded-lg cursor-pointer"
            >
              <div className="w-[38px] h-[38px] rounded-[10px] bg-[#EEF2F6] flex items-center justify-center text-[#2C4F93] shrink-0 mt-0.5">
                <MessageCircle className="w-4 h-4 stroke-[2]" />
              </div>

              <div className="flex-1 min-w-0 flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-bold text-[15px] text-[#101828]">{msg.phone}</span>
                    <div className="flex items-center gap-1 text-[12px] text-[#99A1AF]">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{msg.time}</span>
                    </div>
                  </div>

                  <span className={`px-2.5 py-0.5 text-[11px] font-bold rounded-full tracking-wide ${getStatusStyle(msg.status)}`}>
                    {msg.status}
                  </span>
                </div>

                <p className="text-[13px] text-[#475569] leading-relaxed pr-6 mt-1">
                  {msg.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <SmsMessageDialog
        message={openMessage}
        open={openMessage !== null}
        onOpenChange={(isOpen) => !isOpen && setOpenMessage(null)}
      />

    </div>
  );
}
