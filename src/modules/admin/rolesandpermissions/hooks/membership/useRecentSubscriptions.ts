import { useQuery } from "@tanstack/react-query"
import { getRecentSubscriptions } from "../../services/membership.service"
import { SUBSCRIPTION_QUERY_KEYS } from "../../constants/membership.constants"

export function useRecentSubscriptions() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: SUBSCRIPTION_QUERY_KEYS.recent(),
    queryFn: getRecentSubscriptions,
  })

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
  }
}

export type UseRecentSubscriptionsResult = ReturnType<typeof useRecentSubscriptions>
