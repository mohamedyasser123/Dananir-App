import type { FormFieldConfig } from "@/components/shared/form/form.types"

export const MEMBERSHIP_PLAN_FORM_FIELDS: FormFieldConfig[] = [
  { name: "name", label: "Plan Name", type: "text", placeholder: "Enter plan name", required: true },
  { name: "price", label: "Price", type: "text", placeholder: "$9.99", required: true },
  { name: "activeUsers", label: "Active Users", type: "text", placeholder: "e.g. 2,450" },
  {
    name: "features",
    label: "Features",
    type: "textarea",
    placeholder: "One feature per line",
    helperText: "Separate each feature with a comma",
    colSpan: 2,
  },
  { name: "isPopular", label: "Mark as Most Popular", type: "checkbox" },
]
