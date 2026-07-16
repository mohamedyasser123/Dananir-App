import { useQuery } from "@tanstack/react-query"
import { getAdmins } from "../services/admin.service"
import { ADMIN_QUERY_KEYS } from "../constants/admin.constants"

export function useAdmins() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ADMIN_QUERY_KEYS.lists(),
    queryFn: getAdmins,
  })

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
  }
}

export type UseAdminsResult = ReturnType<typeof useAdmins>
