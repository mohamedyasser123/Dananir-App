import { useQuery } from "@tanstack/react-query"
import { getCompanies } from "../../services/company.service"
import { COMPANY_QUERY_KEYS } from "../../constants/company.constants"

export function useCompanies() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: COMPANY_QUERY_KEYS.lists(),
    queryFn: getCompanies,
  })

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
  }
}

export type UseCompaniesResult = ReturnType<typeof useCompanies>
