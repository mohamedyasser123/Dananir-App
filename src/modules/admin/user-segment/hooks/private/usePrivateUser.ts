import { useQuery } from "@tanstack/react-query"
import { getPrivateUserById } from "../../services/private.service"
import { PRIVATE_USER_QUERY_KEYS } from "../../constants/private.constants"

export function usePrivateUser(id: string | undefined) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: PRIVATE_USER_QUERY_KEYS.detail(id ?? ""),
    queryFn: () => getPrivateUserById(id as string),
    enabled: Boolean(id),
  })

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
  }
}

export type UsePrivateUserResult = ReturnType<typeof usePrivateUser>
