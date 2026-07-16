import { useQuery } from "@tanstack/react-query"
import { getDashboardData } from "../services/dashboard.service"
import { DASHBOARD_QUERY_KEY } from "../constants/dashboard.constants"

export function useDashboard() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: DASHBOARD_QUERY_KEY,
    queryFn: getDashboardData,
  })

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
  }
}

export type UseDashboardResult = ReturnType<typeof useDashboard>
