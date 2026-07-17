import type { ReactNode } from "react"
import { cn } from "../../../utils/utils"

interface FormGridProps {
  children: ReactNode
  columns?: 1 | 2 | 3
  className?: string
}

export function FormGrid({ children, columns = 2, className }: FormGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6",
        columns === 2 && "sm:grid-cols-2",
        columns === 3 && "sm:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  )
}
