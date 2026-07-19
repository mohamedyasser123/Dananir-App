import { useQuery } from "@tanstack/react-query"
import { getRoles } from "../../services/role.service"
import { ROLE_QUERY_KEYS } from "../../constants/role.constants"

export function useRoles() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ROLE_QUERY_KEYS.lists(),
    queryFn: getRoles,
  })

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
  }
}

export type UseRolesResult = ReturnType<typeof useRoles>
