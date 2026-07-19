import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createNotification } from "../../services/communication.service"
import { NOTIFICATION_QUERY_KEYS } from "../../constants/communication.constants"

export function useCreateNotification() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATION_QUERY_KEYS.lists() })
    },
  })
}
