import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteSms } from "../../services/communication.service"
import { SMS_QUERY_KEYS } from "../../constants/communication.constants"
import type { Sms } from "../../types/communication.types"

interface DeleteSmsContext {
  previousSms?: Sms[]
}

export function useDeleteSms() {
  const queryClient = useQueryClient()

  return useMutation<{ id: string }, Error, string, DeleteSmsContext>({
    mutationFn: deleteSms,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: SMS_QUERY_KEYS.lists() })
      const previousSms = queryClient.getQueryData<Sms[]>(SMS_QUERY_KEYS.lists())

      queryClient.setQueryData<Sms[]>(SMS_QUERY_KEYS.lists(), (old) =>
        old?.filter((sms) => sms.id !== id)
      )

      return { previousSms }
    },
    onError: (_error, _id, context) => {
      if (context?.previousSms) {
        queryClient.setQueryData(SMS_QUERY_KEYS.lists(), context.previousSms)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: SMS_QUERY_KEYS.lists() })
    },
  })
}
