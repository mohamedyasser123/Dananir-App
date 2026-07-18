export const MEMBERSHIP_PLAN_QUERY_KEYS = {
  all: ["membershipPlans"] as const,
  lists: () => [...MEMBERSHIP_PLAN_QUERY_KEYS.all, "list"] as const,
  detail: (id: string) => [...MEMBERSHIP_PLAN_QUERY_KEYS.all, "detail", id] as const,
}

export const SUBSCRIPTION_QUERY_KEYS = {
  all: ["subscriptions"] as const,
  recent: () => [...SUBSCRIPTION_QUERY_KEYS.all, "recent"] as const,
}
