export const ADMIN_QUERY_KEYS = {
  all: ["admins"] as const,
  lists: () => [...ADMIN_QUERY_KEYS.all, "list"] as const,
  detail: (id: string) => [...ADMIN_QUERY_KEYS.all, "detail", id] as const,
}
