import { useQuery } from "@tanstack/react-query"
import { getRoleById } from "../../services/role.service"
import { ROLE_QUERY_KEYS } from "../../constants/role.constants"

export function useRole(id: string | undefined) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ROLE_QUERY_KEYS.detail(id ?? ""),
    queryFn: () => getRoleById(id as string),
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

export type UseRoleResult = ReturnType<typeof useRole>
