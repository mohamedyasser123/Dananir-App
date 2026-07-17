import { Mail, Phone, MessageSquare, MessagesSquare, ChevronDown, Wallet } from "lucide-react";

export default function AdminOverviewHeader() {
    return (
        <div className="w-full space-y-6 !px-6 !py-4">

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 w-full">
                <div>
                    <h1 className="text-[32px] font-bold text-[#0D3B73] tracking-tight">
                        Admin Overview
                    </h1>
                    <p className="text-[15px] text-[#475569] font-medium mt-1">
                        Real-time performance metrics and system health monitoring.
                    </p>
                </div>

                <div className="bg-white border border-[#EAEAEA] rounded-[16px] p-4 flex items-center gap-6 min-w-[300px] w-fit shadow-sm">

                    <div className="p-3 bg-[#EEF2F6] rounded-[12px] text-[#0D3B73] flex items-center justify-center shrink-0">
                        <Wallet className="w-6 h-6 stroke-[2.5]" />
                    </div>

                    <div className="flex flex-col justify-center space-y-0.5 flex-1">
                        <span className="text-[12px] font-bold text-[#99A1AF] tracking-wider uppercase whitespace-nowrap">
                            TOTAL REVENUE
                        </span>
                        <div className="text-[20px] font-extrabold text-[#0D3B73] whitespace-nowrap">
                            $4,829,102.50
                        </div>
                    </div>

                    <div className="shrink-0">
                        <span className="bg-[#ECFDF5] text-[#10B981] text-[12px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap">
                            +14.2%
                        </span>
                    </div>

                </div>

            </div>

            <div className="w-full bg-white border border-[#EAEAEA] rounded-[24px] p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-sm">

                <div className="flex items-center gap-4 min-w-[220px]">
                    <img
                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=120&h=120"
                        alt="Admin Avatar"
                        className="w-[60px] h-[60px] rounded-[16px] object-cover object-top border border-[#EAEAEA]"
                    />
                    <div className="flex flex-col">
                        <h3 className="text-[#0D3B73] font-bold text-[18px] leading-tight">
                            Mohamed hussein
                        </h3>
                        <span className="text-[#99A1AF] text-[13px] font-semibold mt-1">
                            ID: PL-992011
                        </span>
                    </div>
                </div>

                <div className="hidden lg:block h-10 w-[1px] bg-[#EAEAEA]" />

                <div className="flex flex-col gap-1 min-w-[200px]">
                    <span className="text-[#99A1AF] text-[11px] font-bold uppercase tracking-wider">
                        EMAIL ADDRESS
                    </span>
                    <a
                        href="mailto:a.sterling@precisionledger.io"
                        className="text-[#0D3B73] font-bold text-[14px] hover:underline break-all"
                    >
                        a.sterling@precisionledger.io
                    </a>
                </div>

                <div className="hidden lg:block h-10 w-[1px] bg-[#EAEAEA]" />

                <div className="flex flex-col gap-1 min-w-[14px]">
                    <span className="text-[#99A1AF] text-[11px] font-bold uppercase tracking-wider">
                        PHONE NUMBER
                    </span>
                    <span className="text-[#0D3B73] font-bold text-[14px]">
                        +1 (555) 942-0192
                    </span>
                </div>

                <div className="hidden lg:block h-10 w-[1px] bg-[#EAEAEA]" />

                <div className="flex flex-col gap-1 cursor-pointer group min-w-[150px]">
                    <span className="text-[#99A1AF] text-[11px] font-bold uppercase tracking-wider">
                        ASSIGNED ROLE
                    </span>
                    <div className="flex items-center gap-1">
                        <span className="text-[#0D3B73] font-bold text-[14px] group-hover:text-blue-700 transition-colors">
                            Global Administrator
                        </span>
                        <ChevronDown className="w-4 h-4 text-[#0D3B73] mt-0.5" />
                    </div>
                </div>

                <div className="flex items-center gap-2 lg:ml-auto">
                    <button className="w-10 h-10 bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#475569] flex items-center justify-center rounded-[12px] transition-colors">
                        <Mail className="w-[18px] h-[18px]" />
                    </button>

                    <button className="w-10 h-10 bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#475569] flex items-center justify-center rounded-[12px] transition-colors">
                        <Phone className="w-[18px] h-[18px]" />
                    </button>

                    <button className="w-10 h-10 bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#475569] flex items-center justify-center rounded-[12px] transition-colors">
                        <MessageSquare className="w-[18px] h-[18px]" />
                    </button>

                    <button className="w-11 h-11 bg-[#2C4F93] hover:bg-[#1E3A70] text-white flex items-center justify-center rounded-[12px] shadow-sm transition-colors ml-1">
                        <MessagesSquare className="w-[20px] h-[20px]" />
                    </button>
                </div>

            </div>

        </div>
    );
}