import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteAdmin } from "../services/admin.service"
import { ADMIN_QUERY_KEYS } from "../constants/admin.constants"
import type { AdminUser } from "../types/admin.types"

interface DeleteAdminContext {
  previousAdmins?: AdminUser[]
}

export function useDeleteAdmin() {
  const queryClient = useQueryClient()

  return useMutation<{ id: string }, Error, string, DeleteAdminContext>({
    mutationFn: deleteAdmin,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ADMIN_QUERY_KEYS.lists() })
      const previousAdmins = queryClient.getQueryData<AdminUser[]>(ADMIN_QUERY_KEYS.lists())

      queryClient.setQueryData<AdminUser[]>(ADMIN_QUERY_KEYS.lists(), (old) =>
        old?.filter((admin) => admin.id !== id)
      )

      return { previousAdmins }
    },
    onError: (_error, _id, context) => {
      if (context?.previousAdmins) {
        queryClient.setQueryData(ADMIN_QUERY_KEYS.lists(), context.previousAdmins)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEYS.lists() })
    },
  })
}
