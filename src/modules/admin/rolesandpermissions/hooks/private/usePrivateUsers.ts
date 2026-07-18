import { useQuery } from "@tanstack/react-query"
import { getPrivateUsers } from "../../services/private.service"
import { PRIVATE_USER_QUERY_KEYS } from "../../constants/private.constants"

export function usePrivateUsers() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: PRIVATE_USER_QUERY_KEYS.lists(),
    queryFn: getPrivateUsers,
  })

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
  }
}

export type UsePrivateUsersResult = ReturnType<typeof usePrivateUsers>
