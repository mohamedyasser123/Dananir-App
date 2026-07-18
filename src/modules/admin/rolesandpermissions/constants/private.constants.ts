export const PRIVATE_USER_QUERY_KEYS = {
  all: ["privateUsers"] as const,
  lists: () => [...PRIVATE_USER_QUERY_KEYS.all, "list"] as const,
  detail: (id: string) => [...PRIVATE_USER_QUERY_KEYS.all, "detail", id] as const,
}
