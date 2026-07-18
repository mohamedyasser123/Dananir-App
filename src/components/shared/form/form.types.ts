import type { ReactNode } from "react"

export type FormFieldType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "tel"
  | "select"
  | "image"
  | "textarea"
  | "date"
  | "checkbox"
  | "radio"
  | "file"
  | "custom"

export type UploadVariant = "avatar" | "logo" | "document" | "image"

export interface SelectOption {
  label: string
  value: string
}

export interface CustomFieldRenderProps {
  value: unknown
  onChange: (value: unknown) => void
  disabled?: boolean
}

export interface FormFieldConfig {
  name: string
  label: string
  type: FormFieldType
  placeholder?: string
  helperText?: string
  required?: boolean
  disabled?: boolean
  options?: SelectOption[]
  uploadVariant?: UploadVariant
  colSpan?: 1 | 2
  /** Only used when type is "custom". Renders arbitrary field UI wired to the form's value/onChange. */
  render?: (props: CustomFieldRenderProps) => ReactNode
}

export interface FormDialogTab {
  key: string
  label: string
  fields: FormFieldConfig[]
  columns?: 1 | 2 | 3
}
