import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toggleEmailStar } from "../../services/communication.service"
import { EMAIL_QUERY_KEYS } from "../../constants/communication.constants"
import type { Email } from "../../types/communication.types"

interface ToggleEmailStarContext {
  previousEmails?: Email[]
}

export function useToggleEmailStar() {
  const queryClient = useQueryClient()

  return useMutation<Email, Error, string, ToggleEmailStarContext>({
    mutationFn: toggleEmailStar,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: EMAIL_QUERY_KEYS.lists() })
      const previousEmails = queryClient.getQueryData<Email[]>(EMAIL_QUERY_KEYS.lists())

      queryClient.setQueryData<Email[]>(EMAIL_QUERY_KEYS.lists(), (old) =>
        old?.map((email) => (email.id === id ? { ...email, starred: !email.starred } : email))
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
