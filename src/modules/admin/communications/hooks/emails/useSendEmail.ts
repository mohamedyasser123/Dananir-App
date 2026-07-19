import { useMutation, useQueryClient } from "@tanstack/react-query"
import { sendEmail } from "../../services/communication.service"
import { EMAIL_QUERY_KEYS } from "../../constants/communication.constants"

export function useSendEmail() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: sendEmail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EMAIL_QUERY_KEYS.lists() })
    },
  })
}
