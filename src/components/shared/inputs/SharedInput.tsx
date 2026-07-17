import * as React from "react"
import { cn } from "../../../utils/utils"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
  iconClassName?: string
}

export const SharedInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, iconClassName, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <input
          type={type}
          className={cn(
            "flex h-12 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all duration-200 focus:border-[#2C4F93] focus:ring-2 focus:ring-[#2C4F93]/20 disabled:cursor-not-allowed disabled:opacity-50",
            icon && "pr-11",
            className
          )}
          ref={ref}
          {...props}
        />
        {icon && (
          <div
            className={cn(
              "absolute top-1/2 -translate-y-1/2 right-4 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer select-none",
              iconClassName
            )}
          >
            {icon}
          </div>
        )}
      </div>
    )
  }
)
SharedInput.displayName = "SharedInput"
