import * as React from "react"
import { cn } from "../../utils/utils"
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost'
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
          variant === 'outline' && "border border-white/20 bg-transparent text-white hover:bg-white/10",
          variant === 'ghost' && "text-white/70 hover:text-white hover:bg-white/5",
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