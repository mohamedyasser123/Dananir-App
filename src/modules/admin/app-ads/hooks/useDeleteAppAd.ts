import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteAppAd } from "../services/appAds.service"
import { APP_AD_QUERY_KEYS } from "../constants/appAds.constants"
import type { AppAd } from "../types/appAds.types"

interface DeleteAppAdContext {
  previousAppAds?: AppAd[]
}

export function useDeleteAppAd() {
  const queryClient = useQueryClient()

  return useMutation<{ id: string }, Error, string, DeleteAppAdContext>({
    mutationFn: deleteAppAd,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: APP_AD_QUERY_KEYS.lists() })
      const previousAppAds = queryClient.getQueryData<AppAd[]>(APP_AD_QUERY_KEYS.lists())

      queryClient.setQueryData<AppAd[]>(APP_AD_QUERY_KEYS.lists(), (old) =>
        old?.filter((appAd) => appAd.id !== id)
      )

      return { previousAppAds }
    },
    onError: (_error, _id, context) => {
      if (context?.previousAppAds) {
        queryClient.setQueryData(APP_AD_QUERY_KEYS.lists(), context.previousAppAds)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: APP_AD_QUERY_KEYS.lists() })
    },
  })
}
