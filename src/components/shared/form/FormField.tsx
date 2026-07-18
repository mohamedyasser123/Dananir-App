import { useState } from "react"
import { Controller } from "react-hook-form"
import type {
  Control,
  ControllerRenderProps,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "../../../utils/utils"
import { SharedInput } from "../inputs/SharedInput"
import { SharedSelect } from "../inputs/SharedSelect"
import { SharedUpload } from "../inputs/SharedUpload"
import { Textarea } from "../../ui/textarea"
import { Checkbox } from "../../ui/checkbox"
import type { FormFieldConfig } from "./form.types"

interface FormFieldInputProps<TFieldValues extends FieldValues> {
  config: FormFieldConfig
  controllerField: ControllerRenderProps<TFieldValues, Path<TFieldValues>>
}

function PasswordFieldInput<TFieldValues extends FieldValues>({
  config,
  controllerField,
}: FormFieldInputProps<TFieldValues>) {
  const [visible, setVisible] = useState(false)

  return (
    <SharedInput
      id={config.name}
      type={visible ? "text" : "password"}
      placeholder={config.placeholder}
      disabled={config.disabled}
      value={controllerField.value ?? ""}
      onChange={controllerField.onChange}
      onBlur={controllerField.onBlur}
      icon={
        <button type="button" onClick={() => setVisible((prev) => !prev)} className="focus:outline-none">
          {visible ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      }
    />
  )
}

function FormFieldInput<TFieldValues extends FieldValues>({
  config,
  controllerField,
}: FormFieldInputProps<TFieldValues>) {
  switch (config.type) {
    case "select":
      return (
        <SharedSelect
          value={controllerField.value ?? ""}
          onValueChange={controllerField.onChange}
          options={config.options ?? []}
          placeholder={config.placeholder}
          disabled={config.disabled}
        />
      )

    case "image":
      return (
        <SharedUpload
          variant={config.uploadVariant ?? "image"}
          value={controllerField.value ?? null}
          onChange={controllerField.onChange}
          disabled={config.disabled}
        />
      )

    case "textarea":
      return (
        <Textarea
          id={config.name}
          placeholder={config.placeholder}
          disabled={config.disabled}
          value={controllerField.value ?? ""}
          onChange={controllerField.onChange}
          onBlur={controllerField.onBlur}
        />
      )

    case "checkbox":
      return (
        <Checkbox
          id={config.name}
          checked={Boolean(controllerField.value)}
          onCheckedChange={controllerField.onChange}
          disabled={config.disabled}
        />
      )

    case "radio":
      return (
        <div className="flex flex-col gap-2">
          {(config.options ?? []).map((option) => (
            <label key={option.value} className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="radio"
                name={config.name}
                value={option.value}
                checked={controllerField.value === option.value}
                onChange={() => controllerField.onChange(option.value)}
                disabled={config.disabled}
                className="h-4 w-4"
              />
              {option.label}
            </label>
          ))}
        </div>
      )

    case "file":
      return (
        <SharedUpload
          value={controllerField.value ?? null}
          onChange={controllerField.onChange}
          disabled={config.disabled}
        />
      )

    case "date":
      return (
        <SharedInput
          id={config.name}
          type="date"
          placeholder={config.placeholder}
          disabled={config.disabled}
          value={controllerField.value ?? ""}
          onChange={controllerField.onChange}
          onBlur={controllerField.onBlur}
        />
      )

    case "password":
      return <PasswordFieldInput config={config} controllerField={controllerField} />

    case "custom":
      return config.render
        ? config.render({
            value: controllerField.value,
            onChange: controllerField.onChange,
            disabled: config.disabled,
          })
        : null

    case "text":
    case "email":
    case "number":
    case "tel":
    default:
      return (
        <SharedInput
          id={config.name}
          type={config.type}
          placeholder={config.placeholder}
          disabled={config.disabled}
          value={controllerField.value ?? ""}
          onChange={controllerField.onChange}
          onBlur={controllerField.onBlur}
        />
      )
  }
}

interface FormFieldProps<TFieldValues extends FieldValues> {
  field: FormFieldConfig
  control: Control<TFieldValues>
  errors: FieldErrors<TFieldValues>
}

export function FormField<TFieldValues extends FieldValues>({
  field,
  control,
  errors,
}: FormFieldProps<TFieldValues>) {
  const fieldName = field.name as Path<TFieldValues>
  const fieldError = errors[fieldName]
  const errorMessage = typeof fieldError?.message === "string" ? fieldError.message : undefined

  return (
    <div className={cn("flex flex-col gap-1.5", field.colSpan === 2 && "sm:col-span-2")}>
      {field.label && (
        <label htmlFor={field.name} className="text-sm font-medium text-slate-700">
          {field.label}
          {field.required && <span className="ml-0.5 text-red-500">*</span>}
        </label>
      )}

      <Controller
        name={fieldName}
        control={control}
        render={({ field: controllerField }) => (
          <FormFieldInput config={field} controllerField={controllerField} />
        )}
      />

      {errorMessage ? (
        <p className="text-xs text-red-500">{errorMessage}</p>
      ) : field.helperText ? (
        <p className="text-xs text-slate-400">{field.helperText}</p>
      ) : null}
    </div>
  )
}
