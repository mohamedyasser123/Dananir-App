import { useQuery } from "@tanstack/react-query"
import { getAppAds } from "../services/appAds.service"
import { APP_AD_QUERY_KEYS } from "../constants/appAds.constants"

export function useAppAds() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: APP_AD_QUERY_KEYS.lists(),
    queryFn: getAppAds,
  })

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
  }
}

export type UseAppAdsResult = ReturnType<typeof useAppAds>
