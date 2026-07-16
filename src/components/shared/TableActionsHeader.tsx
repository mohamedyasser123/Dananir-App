import { Search, Filter, Plus } from "lucide-react";

interface TableActionsHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string; 
  showFilter?: boolean; 
  onFilterClick?: () => void;
  actionButtonText?: string; 
  onActionClick?: () => void; 
}

export default function TableActionsHeader({
  searchTerm,
  onSearchChange,
  searchPlaceholder = "Search...",
  showFilter = true,
  onFilterClick,
  actionButtonText,
  onActionClick,
}: TableActionsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full !py-4">
      
      <div className="flex items-center gap-3 flex-1 max-w-md w-full">
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-[#99A1AF]" />
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full h-[42px] pl-10 pr-4 text-[14px] text-[#12121280]/50 placeholder-[#99A1AF] font-regular bg-white border border-[#99A1AF] rounded-[10px] focus:outline-none focus:border-[#2C4F93] transition-colors"
          />
        </div>

        {showFilter && (
          <button
            onClick={onFilterClick}
            className="h-[42px] px-4 flex items-center gap-2 bg-white border border-[#99A1AF] rounded-[10px] text-[#101828] text-[14px] font-semibold hover:bg-slate-50 active:bg-slate-100 transition-colors shrink-0"
          >
            <Filter className="h-4 w-4 text-[#101828]" />
            <span>Filters</span>
          </button>
        )}
      </div>

      {actionButtonText && onActionClick && (
        <button
          onClick={onActionClick}
          className="h-[42px] px-5 flex items-center justify-center gap-2 bg-[#2C4F93] hover:bg-[#2C4F93] text-white rounded-[14px] text-[14px] font-regular shadow-sm transition-all duration-200 shrink-0"
        >
          <Plus className="h-4 w-4 text-white stroke-[3px]" />
          <span>{actionButtonText}</span>
        </button>
      )}

    </div>
  );
}