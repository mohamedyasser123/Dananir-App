import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAdmin } from "../services/admin.service"
import { ADMIN_QUERY_KEYS } from "../constants/admin.constants"

export function useCreateAdmin() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEYS.lists() })
    },
  })
}
