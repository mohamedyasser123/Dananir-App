import { useMutation, useQueryClient } from "@tanstack/react-query"
import { sendSms } from "../../services/communication.service"
import { SMS_QUERY_KEYS } from "../../constants/communication.constants"

export function useSendSms() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: sendSms,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SMS_QUERY_KEYS.lists() })
    },
  })
}
