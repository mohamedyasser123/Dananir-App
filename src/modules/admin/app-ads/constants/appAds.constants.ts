import type { SelectOption } from "@/components/shared/form/form.types"

export const APP_AD_QUERY_KEYS = {
  all: ["appAds"] as const,
  lists: () => [...APP_AD_QUERY_KEYS.all, "list"] as const,
  detail: (id: string) => [...APP_AD_QUERY_KEYS.all, "detail", id] as const,
}

export const APP_AD_STATUS_OPTIONS: SelectOption[] = [
  { label: "Active", value: "ACTIVE" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Scheduled", value: "SCHEDULED" },
]
