import type { ReactNode } from "react"

interface FormSectionProps {
  title?: string
  description?: string
  children: ReactNode
}

export function FormSection({ title, description, children }: FormSectionProps) {
  return (
    <div className="flex flex-col gap-4">
      {(title || description) && (
        <div className="space-y-1">
          {title && <h3 className="text-sm font-semibold text-slate-900">{title}</h3>}
          {description && <p className="text-xs text-slate-500">{description}</p>}
        </div>
      )}
      {children}
    </div>
  )
}
