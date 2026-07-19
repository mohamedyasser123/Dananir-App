export const NOTIFICATION_QUERY_KEYS = {
  all: ["notifications"] as const,
  lists: () => [...NOTIFICATION_QUERY_KEYS.all, "list"] as const,
  detail: (id: string) => [...NOTIFICATION_QUERY_KEYS.all, "detail", id] as const,
}

export const CHAT_QUERY_KEYS = {
  all: ["chats"] as const,
  lists: () => [...CHAT_QUERY_KEYS.all, "list"] as const,
  detail: (id: string) => [...CHAT_QUERY_KEYS.all, "detail", id] as const,
  messages: (chatId: string) => [...CHAT_QUERY_KEYS.all, "messages", chatId] as const,
}

export const SMS_QUERY_KEYS = {
  all: ["sms"] as const,
  lists: () => [...SMS_QUERY_KEYS.all, "list"] as const,
  detail: (id: string) => [...SMS_QUERY_KEYS.all, "detail", id] as const,
}

export const EMAIL_QUERY_KEYS = {
  all: ["emails"] as const,
  lists: () => [...EMAIL_QUERY_KEYS.all, "list"] as const,
  detail: (id: string) => [...EMAIL_QUERY_KEYS.all, "detail", id] as const,
}
