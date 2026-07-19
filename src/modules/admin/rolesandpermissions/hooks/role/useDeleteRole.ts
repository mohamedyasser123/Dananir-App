import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteRole } from "../../services/role.service"
import { ROLE_QUERY_KEYS } from "../../constants/role.constants"
import type { Role } from "../../types/role.types"

interface DeleteRoleContext {
  previousRoles?: Role[]
}

export function useDeleteRole() {
  const queryClient = useQueryClient()

  return useMutation<{ id: string }, Error, string, DeleteRoleContext>({
    mutationFn: deleteRole,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ROLE_QUERY_KEYS.lists() })
      const previousRoles = queryClient.getQueryData<Role[]>(ROLE_QUERY_KEYS.lists())

      queryClient.setQueryData<Role[]>(ROLE_QUERY_KEYS.lists(), (old) =>
        old?.filter((role) => role.id !== id)
      )

      return { previousRoles }
    },
    onError: (_error, _id, context) => {
      if (context?.previousRoles) {
        queryClient.setQueryData(ROLE_QUERY_KEYS.lists(), context.previousRoles)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ROLE_QUERY_KEYS.lists() })
    },
  })
}
