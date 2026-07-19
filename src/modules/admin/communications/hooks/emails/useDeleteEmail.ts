import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteEmail } from "../../services/communication.service"
import { EMAIL_QUERY_KEYS } from "../../constants/communication.constants"
import type { Email } from "../../types/communication.types"

interface DeleteEmailContext {
  previousEmails?: Email[]
}

export function useDeleteEmail() {
  const queryClient = useQueryClient()

  return useMutation<{ id: string }, Error, string, DeleteEmailContext>({
    mutationFn: deleteEmail,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: EMAIL_QUERY_KEYS.lists() })
      const previousEmails = queryClient.getQueryData<Email[]>(EMAIL_QUERY_KEYS.lists())

      queryClient.setQueryData<Email[]>(EMAIL_QUERY_KEYS.lists(), (old) =>
        old?.filter((email) => email.id !== id)
      )

      return { previousEmails }
    },
    onError: (_error, _id, context) => {
      if (context?.previousEmails) {
        queryClient.setQueryData(EMAIL_QUERY_KEYS.lists(), context.previousEmails)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: EMAIL_QUERY_KEYS.lists() })
    },
  })
}
