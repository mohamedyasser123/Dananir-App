import { useEffect } from "react"
import { useForm } from "react-hook-form"
import type { DefaultValues, FieldValues, Resolver } from "react-hook-form"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../ui/dialog"
import { SharedButton } from "../SharedButton"
import { FormField } from "../form/FormField"
import { FormGrid } from "../form/FormGrid"
import type { FormFieldConfig } from "../form/form.types"

interface SharedFormDialogProps<TFieldValues extends FieldValues> {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  fields: FormFieldConfig[]
  defaultValues: DefaultValues<TFieldValues>
  onSubmit: (values: TFieldValues) => void
  resolver?: Resolver<TFieldValues>
  loading?: boolean
  submitText?: string
  cancelText?: string
  columns?: 1 | 2 | 3
}

export function SharedFormDialog<TFieldValues extends FieldValues>({
  open,
  onOpenChange,
  title,
  description,
  fields,
  defaultValues,
  onSubmit,
  resolver,
  loading = false,
  submitText = "Save",
  cancelText = "Cancel",
  columns = 2,
}: SharedFormDialogProps<TFieldValues>) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TFieldValues>({
    defaultValues,
    resolver,
  })

  useEffect(() => {
    if (open) reset(defaultValues)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, defaultValues, reset])

  const handleOpenChange = (nextOpen: boolean) => {
    onOpenChange(nextOpen)
  }

  const submit = handleSubmit(onSubmit)

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <form onSubmit={submit} className="flex flex-col gap-6">
          <FormGrid columns={columns}>
            {fields.map((field) => (
              <FormField key={field.name} field={field} control={control} errors={errors} />
            ))}
          </FormGrid>

          <DialogFooter>
            <SharedButton
              type="button"
              variant="outline"
              size="md"
              onClick={() => handleOpenChange(false)}
              disabled={loading}
              className="bg-[#BCC1C9] border-[#BCC1C9] text-[#475569] hover:bg-[#BCC1C9]"
            >
              {cancelText}
            </SharedButton>
            <SharedButton type="submit" variant="primary" size="md" disabled={loading}
            className="bg-[#2C4F93] hover:bg-[#1E4385] text-white font-semibold transition-colors"
            >
              {loading ? "Saving..." : submitText}
            </SharedButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
