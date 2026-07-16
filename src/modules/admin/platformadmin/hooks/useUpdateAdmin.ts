import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateAdmin } from "../services/admin.service"
import { ADMIN_QUERY_KEYS } from "../constants/admin.constants"
import type { AdminUser } from "../types/admin.types"
import type { UpdateAdminFormValues } from "../schemas/admin.schema"

interface UpdateAdminContext {
  previousAdmins?: AdminUser[]
}

export function useUpdateAdmin() {
  const queryClient = useQueryClient()

  return useMutation<AdminUser, Error, UpdateAdminFormValues, UpdateAdminContext>({
    mutationFn: updateAdmin,
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: ADMIN_QUERY_KEYS.lists() })
      const previousAdmins = queryClient.getQueryData<AdminUser[]>(ADMIN_QUERY_KEYS.lists())

      queryClient.setQueryData<AdminUser[]>(ADMIN_QUERY_KEYS.lists(), (old) =>
        old?.map((admin) => (admin.id === payload.id ? { ...admin, ...payload } : admin))
      )

      return { previousAdmins }
    },
    onError: (_error, _payload, context) => {
      if (context?.previousAdmins) {
        queryClient.setQueryData(ADMIN_QUERY_KEYS.lists(), context.previousAdmins)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEYS.lists() })
    },
  })
}
