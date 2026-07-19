import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteChat } from "../../services/communication.service"
import { CHAT_QUERY_KEYS } from "../../constants/communication.constants"
import type { Chat } from "../../types/communication.types"

interface DeleteChatContext {
  previousChats?: Chat[]
}

export function useDeleteChat() {
  const queryClient = useQueryClient()

  return useMutation<{ id: string }, Error, string, DeleteChatContext>({
    mutationFn: deleteChat,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: CHAT_QUERY_KEYS.lists() })
      const previousChats = queryClient.getQueryData<Chat[]>(CHAT_QUERY_KEYS.lists())

      queryClient.setQueryData<Chat[]>(CHAT_QUERY_KEYS.lists(), (old) =>
        old?.filter((chat) => chat.id !== id)
      )

      return { previousChats }
    },
    onError: (_error, _id, context) => {
      if (context?.previousChats) {
        queryClient.setQueryData(CHAT_QUERY_KEYS.lists(), context.previousChats)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: CHAT_QUERY_KEYS.lists() })
    },
  })
}
