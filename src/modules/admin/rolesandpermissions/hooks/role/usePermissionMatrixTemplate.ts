import { useQuery } from "@tanstack/react-query"
import { getPermissionMatrixTemplate } from "../../services/role.service"
import { PERMISSION_MATRIX_QUERY_KEYS } from "../../constants/role.constants"

export function usePermissionMatrixTemplate() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: PERMISSION_MATRIX_QUERY_KEYS.template(),
    queryFn: getPermissionMatrixTemplate,
  })

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
  }
}

export type UsePermissionMatrixTemplateResult = ReturnType<typeof usePermissionMatrixTemplate>
