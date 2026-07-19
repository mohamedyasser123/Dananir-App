import { useMutation, useQueryClient } from "@tanstack/react-query"
import { sendChatMessage } from "../../services/communication.service"
import { CHAT_QUERY_KEYS } from "../../constants/communication.constants"
import type { ChatMessage } from "../../types/communication.types"

interface SendChatMessageContext {
  previousMessages?: ChatMessage[]
}

export function useSendChatMessage() {
  const queryClient = useQueryClient()

  return useMutation<ChatMessage, Error, { chatId: string; text: string }, SendChatMessageContext>({
    mutationFn: sendChatMessage,
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: CHAT_QUERY_KEYS.messages(payload.chatId) })
      const previousMessages = queryClient.getQueryData<ChatMessage[]>(CHAT_QUERY_KEYS.messages(payload.chatId))

      const optimisticMessage: ChatMessage = {
        id: `optimistic-${Date.now()}`,
        chatId: payload.chatId,
        text: payload.text,
        time: "Just now",
        isMe: true,
      }
      queryClient.setQueryData<ChatMessage[]>(CHAT_QUERY_KEYS.messages(payload.chatId), (old) => [
        ...(old ?? []),
        optimisticMessage,
      ])

      return { previousMessages }
    },
    onError: (_error, payload, context) => {
      if (context?.previousMessages) {
        queryClient.setQueryData(CHAT_QUERY_KEYS.messages(payload.chatId), context.previousMessages)
      }
    },
    onSettled: (_data, _error, payload) => {
      queryClient.invalidateQueries({ queryKey: CHAT_QUERY_KEYS.messages(payload.chatId) })
      queryClient.invalidateQueries({ queryKey: CHAT_QUERY_KEYS.lists() })
    },
  })
}
