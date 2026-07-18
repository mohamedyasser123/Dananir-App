export const BANK_QUERY_KEYS = {
  all: ["banks"] as const,
  lists: () => [...BANK_QUERY_KEYS.all, "list"] as const,
  detail: (id: string) => [...BANK_QUERY_KEYS.all, "detail", id] as const,
}
