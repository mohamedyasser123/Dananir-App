import { useQuery } from "@tanstack/react-query"
import { getAppAdById } from "../services/appAds.service"
import { APP_AD_QUERY_KEYS } from "../constants/appAds.constants"

export function useAppAd(id: string | undefined) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: APP_AD_QUERY_KEYS.detail(id ?? ""),
    queryFn: () => getAppAdById(id as string),
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

export type UseAppAdResult = ReturnType<typeof useAppAd>
