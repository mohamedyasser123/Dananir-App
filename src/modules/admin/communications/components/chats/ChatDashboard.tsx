import { useState } from "react";
import { Search, MoreVertical, Paperclip, Smile, Send } from "lucide-react";
import type { Chat } from "../../types/communication.types";
import { useChatMessages } from "../../hooks/chats/useChatMessages";
import { useSendChatMessage } from "../../hooks/chats/useSendChatMessage";

interface ChatDashboardProps {
  chats: Chat[];
}

export default function ChatDashboard({ chats }: ChatDashboardProps) {
  const [activeTab, setActiveTab] = useState<"user" | "admin">("user");
  const [typeMessage, setTypeMessage] = useState("");

  const filteredChats = chats.filter((chat) => chat.type === activeTab);
  const [selectedChatId, setSelectedChatId] = useState<string | undefined>(
    filteredChats.find((chat) => chat.active)?.id ?? filteredChats[0]?.id
  );
  const selectedChat = chats.find((chat) => chat.id === selectedChatId);

  const { data: messages = [] } = useChatMessages(selectedChatId);
  const sendMessage = useSendChatMessage();

  const handleSelectTab = (tab: "user" | "admin") => {
    setActiveTab(tab);
    const nextChats = chats.filter((chat) => chat.type === tab);
    setSelectedChatId(nextChats[0]?.id);
  };

  const handleSend = () => {
    if (!selectedChatId || !typeMessage.trim()) return;
    sendMessage.mutate({ chatId: selectedChatId, text: typeMessage.trim() });
    setTypeMessage("");
  };

  return (
    <div className="flex w-full h-[calc(100vh-40px)] bg-[#FAFAFA] gap-6 p-6 font-sans">

      <div className="w-[340px] bg-white border border-[#EAEAEA] rounded-[16px] flex flex-col overflow-hidden">

        <div className="flex border-b border-[#EAEAEA] px-4">
          <button
            onClick={() => handleSelectTab("user")}
            className={`flex-1 py-4 text-[15px] font-bold text-center transition-all relative cursor-pointer ${
              activeTab === "user" ? "text-[#1D4ED8]" : "text-[#667085] hover:text-slate-800"
            }`}
          >
            User
            {activeTab === "user" && (
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#1D4ED8] rounded-t-full" />
            )}
          </button>
          <button
            onClick={() => handleSelectTab("admin")}
            className={`flex-1 py-4 text-[15px] font-bold text-center transition-all relative cursor-pointer ${
              activeTab === "admin" ? "text-[#1D4ED8]" : "text-[#667085] hover:text-slate-800"
            }`}
          >
            Admin
            {activeTab === "admin" && (
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#1D4ED8] rounded-t-full" />
            )}
          </button>
        </div>

        <div className="p-4 flex flex-col gap-3">
          <h2 className="text-[20px] font-bold text-[#101828]">Messages</h2>
          <div className="relative w-full">
            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-[#99A1AF]" />
            </span>
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full h-[40px] pl-10 pr-4 text-[14px] bg-[#F9FAFB] border border-[#EAEAEA] rounded-[10px] focus:outline-none focus:border-[#1D4ED8] transition-colors placeholder-[#99A1AF]"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChatId(chat.id)}
              className={`flex items-center gap-3 px-4 py-4 border-l-[3px] transition-all cursor-pointer border-b border-[#F9FAFB] ${
                chat.id === selectedChatId
                  ? "bg-[#EFF6FF] border-[#1D4ED8]"
                  : "bg-white border-transparent hover:bg-slate-50"
              }`}
            >
              <div className="relative shrink-0">
                <div className="w-[44px] h-[44px] rounded-full bg-[#1D4ED8] text-white flex items-center justify-center font-bold text-[14px]">
                  {chat.initials}
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#0F9D58] border-2 border-white rounded-full" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-[14px] text-[#101828] truncate">{chat.name}</span>
                  <span className="text-[12px] text-[#99A1AF] shrink-0">{chat.time}</span>
                </div>
                <p className="text-[13px] text-[#667085] truncate pr-2">{chat.message}</p>
              </div>

              {chat.unread > 0 && (
                <span className="shrink-0 w-5 h-5 bg-[#1D4ED8] text-white rounded-full flex items-center justify-center text-[11px] font-bold">
                  {chat.unread}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 bg-white border border-[#EAEAEA] rounded-[16px] flex flex-col overflow-hidden">

        <div className="h-[76px] border-b border-[#EAEAEA] px-6 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-[44px] h-[44px] rounded-full bg-[#1D4ED8] text-white flex items-center justify-center font-bold text-[14px]">
                {selectedChat?.initials}
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#0F9D58] border-2 border-white rounded-full" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[16px] text-[#101828]">{selectedChat?.name}</span>
              <span className="text-[12px] text-[#99A1AF]">Active now</span>
            </div>
          </div>
          <button className="text-[#667085] hover:text-slate-800 p-1.5 hover:bg-slate-50 rounded-full transition-colors cursor-pointer">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-white flex flex-col gap-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col max-w-[70%] ${msg.isMe ? "self-end items-end" : "self-start items-start"}`}
            >
              <div
                className={`px-4 py-3 text-[14px] leading-relaxed shadow-[0_1px_2px_rgba(0,0,0,0.02)] ${
                  msg.isMe
                    ? "bg-[#1D4ED8] text-white rounded-[16px] rounded-tr-[2px]"
                    : "bg-[#F9FAFB] text-[#101828] border border-[#EAEAEA] rounded-[16px] rounded-tl-[2px]"
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[11px] text-[#99A1AF] mt-1.5 px-1">{msg.time}</span>
            </div>
          ))}
        </div>

        <div className="h-[84px] border-t border-[#EAEAEA] px-6 flex items-center gap-4 bg-white shrink-0">
          <div className="flex items-center gap-3 text-[#99A1AF]">
            <button className="hover:text-slate-600 transition-colors cursor-pointer p-1">
              <Paperclip className="w-5 h-5" />
            </button>
            <button className="hover:text-slate-600 transition-colors cursor-pointer p-1">
              <Smile className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 relative flex items-center">
            <input
              type="text"
              value={typeMessage}
              onChange={(e) => setTypeMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              className="w-full h-[46px] pl-4 pr-4 text-[14px] text-slate-800 bg-white border border-[#EAEAEA] rounded-[10px] focus:outline-none focus:border-[#1D4ED8] placeholder-[#99A1AF]"
            />
          </div>

          <button
            onClick={handleSend}
            className="w-[46px] h-[46px] bg-[#2C4F93] hover:bg-[#1E3A75] text-white rounded-[10px] flex items-center justify-center shadow-sm transition-all cursor-pointer shrink-0"
          >
            <Send className="w-[18px] h-[18px] mr-0.5" />
          </button>
        </div>

      </div>

    </div>
  );
}
