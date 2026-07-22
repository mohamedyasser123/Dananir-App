import type { SelectOption } from "@/components/shared/form/form.types"

export const COMPANY_QUERY_KEYS = {
  all: ["companies"] as const,
  lists: () => [...COMPANY_QUERY_KEYS.all, "list"] as const,
  detail: (id: string) => [...COMPANY_QUERY_KEYS.all, "detail", id] as const,
}

export const INDUSTRY_BRANCH_OPTIONS: SelectOption[] = [
  { label: "Banking", value: "banking" },
  { label: "Real Estate", value: "real_estate" },
  { label: "Technology", value: "technology" },
  { label: "Retail", value: "retail" },
]
