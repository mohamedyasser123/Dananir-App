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

export type UploadVariant = "avatar" | "logo" | "document" | "image"

export interface SelectOption {
  label: string
  value: string
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
}
