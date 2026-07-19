import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createRole } from "../../services/role.service"
import { ROLE_QUERY_KEYS } from "../../constants/role.constants"

export function useCreateRole() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ROLE_QUERY_KEYS.lists() })
    },
  })
}
