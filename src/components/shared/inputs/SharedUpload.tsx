import { useEffect, useRef, useState } from "react"
import { Upload } from "lucide-react"
import { cn } from "../../../utils/utils"
import { SharedButton } from "../SharedButton"
import type { UploadVariant } from "../form/form.types"

interface SharedUploadProps {
  value?: File | null
  onChange: (file: File | null) => void
  variant?: UploadVariant
  accept?: string
  disabled?: boolean
}

export function SharedUpload({ value, onChange, variant = "image", accept, disabled }: SharedUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const isAvatar = variant === "avatar" || variant === "logo"

  useEffect(() => {
    if (!value) {
      setPreviewUrl(null)
      return
    }

    const url = URL.createObjectURL(value)
    setPreviewUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [value])

  return (
    <div className="flex items-center gap-4">
      <div
        className={cn(
          "flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden border border-dashed border-slate-300 bg-slate-50 text-slate-400",
          isAvatar ? "rounded-full" : "rounded-lg"
        )}
      >
        {previewUrl ? (
          <img src={previewUrl} alt="Preview" className="h-full w-full object-cover" />
        ) : (
          <Upload className="h-5 w-5" />
        )}
      </div>

      <div className="flex items-center gap-2">
        <SharedButton
          type="button"
          variant="primary"
          size="sm"
          disabled={disabled}
          onClick={() => inputRef.current?.click()}
        >
          {value ? "Replace" : "Upload"}
        </SharedButton>

        {value && (
          <SharedButton
            type="button"
            variant="secondary"
            size="sm"
            disabled={disabled}
            onClick={() => {
              onChange(null)
              if (inputRef.current) inputRef.current.value = ""
            }}
          >
            Remove
          </SharedButton>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        disabled={disabled}
        className="hidden"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />
    </div>
  )
}
