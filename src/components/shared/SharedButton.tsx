import * as React from "react"
import { cn } from "../../utils/utils"
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg' | 'full'
}

export const SharedButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'full', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
          variant === 'primary' && "bg-[#2f65cd] text-white hover:bg-[#2552ad] shadow-lg shadow-blue-500/10",
          variant === 'secondary' && "bg-slate-100 text-slate-700 hover:bg-slate-200",
          variant === 'outline' && "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
          variant === 'danger' && "bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-500/10",
          variant === 'ghost' && "text-slate-600 hover:text-slate-900 hover:bg-slate-100",
          size === 'sm' && "px-3 py-1.5 text-xs h-9",
          size === 'md' && "px-5 py-2 text-sm h-11",
          size === 'lg' && "px-7 py-3 text-base h-12",
          size === 'full' && "w-full py-3 text-base h-12",
          className
        )}
        {...props}
      />
    )
  }
)
SharedButton.displayName = "SharedButton"
