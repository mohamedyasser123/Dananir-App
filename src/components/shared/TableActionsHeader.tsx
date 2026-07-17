import type { ReactNode } from "react";
import { Search, Filter, Plus } from "lucide-react";

interface TableActionsHeaderProps {
  title?: string;
  subtitle?: string;
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  showSearch?: boolean;
  showFilter?: boolean;
  onFilterClick?: () => void;
  actionButtonText?: string;
  onActionClick?: () => void;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
}

export default function TableActionsHeader({
  title,
  subtitle,
  searchTerm,
  onSearchChange,
  searchPlaceholder = "Search...",
  showSearch = true,
  showFilter = true,
  onFilterClick,
  actionButtonText,
  onActionClick,
  leftContent,
  rightContent,
}: TableActionsHeaderProps) {
  const hasSearch = showSearch && onSearchChange !== undefined;
  const hasAction = Boolean(actionButtonText && onActionClick);
  const hasLeftSection = Boolean(leftContent || title);
  const hasSearchGroup = hasSearch || showFilter;
  const hasActionGroup = hasAction || Boolean(rightContent);

  if (!hasLeftSection && !hasSearchGroup && !hasActionGroup) {
    return null;
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full !py-4">
      {hasLeftSection &&
        (leftContent ?? (
          <div className="flex flex-col">
            <span className="text-[16px] font-semibold text-[#101828]">{title}</span>
            {subtitle && <span className="text-[14px] text-[#99A1AF]">{subtitle}</span>}
          </div>
        ))}

      {hasSearchGroup && (
        <div className="flex items-center gap-3 flex-1 max-w-md w-full">
          {hasSearch && (
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-[#99A1AF]" />
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange?.(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full h-[42px] pl-10 pr-4 text-[14px] text-[#12121280]/50 placeholder-[#99A1AF] font-regular bg-white border border-[#99A1AF] rounded-[10px] focus:outline-none focus:border-[#2C4F93] transition-colors"
              />
            </div>
          )}

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
      )}

      {hasActionGroup && (
        <div className="flex items-center gap-3 shrink-0">
          {hasAction && (
            <button
              onClick={onActionClick}
              className="h-[42px] px-5 flex items-center justify-center gap-2 bg-[#2C4F93] hover:bg-[#2C4F93] text-white rounded-[14px] text-[14px] font-regular shadow-sm transition-all duration-200 shrink-0"
            >
              <Plus className="h-4 w-4 text-white stroke-[3px]" />
              <span>{actionButtonText}</span>
            </button>
          )}

          {rightContent}
        </div>
      )}
    </div>
  );
}
