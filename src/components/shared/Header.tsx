
import { Search, Bell,  ChevronDown, MessageCircle } from 'lucide-react'

export default function Header() {
  return (
<div className="flex w-full items-center justify-between px-5 border-b-[0.8px] border-[#E5E7EB] py-2">
          <h1 className=" px-5 text-xl font-bold text-slate-900">Admin</h1>

      <div className="flex items-center gap-6">
        
 <div className="relative w-72 hidden sm:block">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
  <input
    type="text"
    placeholder="Search..."
    className="w-full h-12 pl-10 pr-6 rounded-[14px] border border-slate-200 bg-white text-[15px] text-slate-800 placeholder-slate-400 outline-none transition-all duration-200 focus:border-[#D1D5DC]"
  />
</div>

        <button className="relative p-1.5 text-slate-600 hover:text-slate-900 transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 left-4 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white" />
        </button>

        <button className="relative p-1.5 text-slate-600 hover:text-slate-900 transition-colors">
          <MessageCircle className="h-5 w-5" />
          <span className="absolute top-0 left-4 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-yellow-500 border-2 border-white" />
        </button>

        <div className="h-6 w-px bg-slate-200" />

        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
            JD
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-950 transition-colors">
              Mohamed
            </span>
            <ChevronDown className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
          </div>
        </div>

      </div>
    </div>
  )
}