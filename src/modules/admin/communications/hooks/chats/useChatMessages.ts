import { useQuery } from "@tanstack/react-query"
import { getChatMessages } from "../../services/communication.service"
import { CHAT_QUERY_KEYS } from "../../constants/communication.constants"

export function useChatMessages(chatId: string | undefined) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: CHAT_QUERY_KEYS.messages(chatId ?? ""),
    queryFn: () => getChatMessages(chatId as string),
    enabled: Boolean(chatId),
  })

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
  }
}

export type UseChatMessagesResult = ReturnType<typeof useChatMessages>
