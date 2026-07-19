import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateRole } from "../../services/role.service"
import { ROLE_QUERY_KEYS } from "../../constants/role.constants"
import type { Role } from "../../types/role.types"
import type { UpdateRoleFormValues } from "../../schemas/role.schema"

interface UpdateRoleContext {
  previousRoles?: Role[]
}

export function useUpdateRole() {
  const queryClient = useQueryClient()

  return useMutation<Role, Error, UpdateRoleFormValues, UpdateRoleContext>({
    mutationFn: updateRole,
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: ROLE_QUERY_KEYS.lists() })
      const previousRoles = queryClient.getQueryData<Role[]>(ROLE_QUERY_KEYS.lists())

      queryClient.setQueryData<Role[]>(ROLE_QUERY_KEYS.lists(), (old) =>
        old?.map((role) => (role.id === payload.id ? { ...role, ...(payload.name ? { title: payload.name } : {}) } : role))
      )

      return { previousRoles }
    },
    onError: (_error, _payload, context) => {
      if (context?.previousRoles) {
        queryClient.setQueryData(ROLE_QUERY_KEYS.lists(), context.previousRoles)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ROLE_QUERY_KEYS.lists() })
    },
  })
}
