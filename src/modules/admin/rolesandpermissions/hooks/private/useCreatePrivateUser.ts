import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createPrivateUser } from "../../services/private.service"
import { PRIVATE_USER_QUERY_KEYS } from "../../constants/private.constants"

export function useCreatePrivateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createPrivateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRIVATE_USER_QUERY_KEYS.lists() })
    },
  })
}
