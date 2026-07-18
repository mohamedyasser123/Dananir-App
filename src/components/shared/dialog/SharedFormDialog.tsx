import { useEffect, useState } from "react"
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
import { Tabs, TabsList, TabsTab, TabsPanel } from "../../ui/tabs"
import { SharedButton } from "../SharedButton"
import { FormField } from "../form/FormField"
import { FormGrid } from "../form/FormGrid"
import type { FormDialogTab, FormFieldConfig } from "../form/form.types"

interface SharedFormDialogProps<TFieldValues extends FieldValues> {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  /** Flat field list. Ignored when `tabs` is provided. */
  fields?: FormFieldConfig[]
  /** Renders the form as tabs, each holding its own field group, sharing one form state and footer. */
  tabs?: FormDialogTab[]
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
  fields = [],
  tabs,
  defaultValues,
  onSubmit,
  resolver,
  loading = false,
  submitText = "Save",
  cancelText = "Cancel",
  columns = 2,
}: SharedFormDialogProps<TFieldValues>) {
  const [activeTab, setActiveTab] = useState(tabs?.[0]?.key)
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
    if (open) {
      reset(defaultValues)
      setActiveTab(tabs?.[0]?.key)
    }
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
          {tabs && tabs.length > 0 ? (
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as string)}>
              <TabsList>
                {tabs.map((tab) => (
                  <TabsTab key={tab.key} value={tab.key}>
                    {tab.label}
                  </TabsTab>
                ))}
              </TabsList>

              {tabs.map((tab) => (
                <TabsPanel key={tab.key} value={tab.key}>
                  <FormGrid columns={tab.columns ?? columns}>
                    {tab.fields.map((field) => (
                      <FormField key={field.name} field={field} control={control} errors={errors} />
                    ))}
                  </FormGrid>
                </TabsPanel>
              ))}
            </Tabs>
          ) : (
            <FormGrid columns={columns}>
              {fields.map((field) => (
                <FormField key={field.name} field={field} control={control} errors={errors} />
              ))}
            </FormGrid>
          )}

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
