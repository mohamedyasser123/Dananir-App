import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAppAd } from "../services/appAds.service"
import { APP_AD_QUERY_KEYS } from "../constants/appAds.constants"

export function useCreateAppAd() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createAppAd,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: APP_AD_QUERY_KEYS.lists() })
    },
  })
}
