import { useQuery } from "@tanstack/react-query"
import { getCompanyById } from "../../services/company.service"
import { COMPANY_QUERY_KEYS } from "../../constants/company.constants"

export function useCompany(id: string | undefined) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: COMPANY_QUERY_KEYS.detail(id ?? ""),
    queryFn: () => getCompanyById(id as string),
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

export type UseCompanyResult = ReturnType<typeof useCompany>
