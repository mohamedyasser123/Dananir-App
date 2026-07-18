import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deletePrivateUser } from "../../services/private.service"
import { PRIVATE_USER_QUERY_KEYS } from "../../constants/private.constants"
import type { PrivateUser } from "../../types/private.types"

interface DeletePrivateUserContext {
  previousUsers?: PrivateUser[]
}

export function useDeletePrivateUser() {
  const queryClient = useQueryClient()

  return useMutation<{ id: string }, Error, string, DeletePrivateUserContext>({
    mutationFn: deletePrivateUser,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: PRIVATE_USER_QUERY_KEYS.lists() })
      const previousUsers = queryClient.getQueryData<PrivateUser[]>(PRIVATE_USER_QUERY_KEYS.lists())

      queryClient.setQueryData<PrivateUser[]>(PRIVATE_USER_QUERY_KEYS.lists(), (old) =>
        old?.filter((user) => user.id !== id)
      )

      return { previousUsers }
    },
    onError: (_error, _id, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(PRIVATE_USER_QUERY_KEYS.lists(), context.previousUsers)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: PRIVATE_USER_QUERY_KEYS.lists() })
    },
  })
}
