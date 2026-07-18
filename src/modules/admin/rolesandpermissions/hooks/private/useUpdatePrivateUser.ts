import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updatePrivateUser } from "../../services/private.service"
import { PRIVATE_USER_QUERY_KEYS } from "../../constants/private.constants"
import type { PrivateUser } from "../../types/private.types"
import type { UpdatePrivateUserFormValues } from "../../schemas/private.schema"

interface UpdatePrivateUserContext {
  previousUsers?: PrivateUser[]
}

export function useUpdatePrivateUser() {
  const queryClient = useQueryClient()

  return useMutation<PrivateUser, Error, UpdatePrivateUserFormValues, UpdatePrivateUserContext>({
    mutationFn: updatePrivateUser,
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: PRIVATE_USER_QUERY_KEYS.lists() })
      const previousUsers = queryClient.getQueryData<PrivateUser[]>(PRIVATE_USER_QUERY_KEYS.lists())

      queryClient.setQueryData<PrivateUser[]>(PRIVATE_USER_QUERY_KEYS.lists(), (old) =>
        old?.map((user) => (user.id === payload.id ? { ...user, ...payload } : user))
      )

      return { previousUsers }
    },
    onError: (_error, _payload, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(PRIVATE_USER_QUERY_KEYS.lists(), context.previousUsers)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: PRIVATE_USER_QUERY_KEYS.lists() })
    },
  })
}
