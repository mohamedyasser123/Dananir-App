import type { FormFieldConfig } from "@/components/shared/form/form.types"
import { APP_AD_STATUS_OPTIONS } from "./appAds.constants"

export const APP_AD_FORM_FIELDS: FormFieldConfig[] = [
  { name: "name", label: "Campaign Name", type: "text", placeholder: "Enter campaign name", required: true, colSpan: 2 },
  { name: "budget", label: "Budget", type: "number", placeholder: "5000", required: true },
  { name: "status", label: "Status", type: "select", options: APP_AD_STATUS_OPTIONS, required: true },
]
