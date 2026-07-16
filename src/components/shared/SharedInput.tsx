import * as React from "react"
import { cn } from "../../utils/utils"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
}

export const SharedInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <input
          type={type}
          className={cn(
            "flex h-12 w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 outline-none transition-all duration-200 focus:border-[#2f65cd] focus:ring-2 focus:ring-[#2f65cd]/20 disabled:cursor-not-allowed disabled:opacity-50",
            
            // 👇 التعديل هنا: بنجبر المتصفح يحافظ على لون الخلفية الداكنة ولون النص الأبيض عند الـ Autofill
            "[-webkit-autofill]:bg-transparent [-webkit-autofill]:text-white",
            "[-webkit-autofill]:[box-shadow:0_0_0_50px_#132240_inset]", // لون خلفية الفورم الداكنة عشان تداري لون المتصفح الافتراضي
            "[-webkit-autofill]:[text-fill-color:white]",
            "autofill:[box-shadow:0_0_0_50px_#132240_inset] autofill:[text-fill-color:white]",
            
            icon && "pr-11", 
            className
          )}
          ref={ref}
          {...props}
        />
        {icon && (
          // تم تغيير الـ top والـ translate عشان نضمن سنترة الأيقونة تماماً رأسيًا جوه الـ Input
          <div className="absolute top-1/2 -translate-y-1/2 right-4 flex items-center text-white/40 hover:text-white/70 cursor-pointer select-none">
            {icon}
          </div>
        )}
      </div>
    )
  }
)
SharedInput.displayName = "SharedInput"