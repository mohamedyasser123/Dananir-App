import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateAppAd } from "../services/appAds.service"
import { APP_AD_QUERY_KEYS } from "../constants/appAds.constants"
import type { AppAd } from "../types/appAds.types"
import type { UpdateAppAdFormValues } from "../schemas/appAds.schema"

interface UpdateAppAdContext {
  previousAppAds?: AppAd[]
}

export function useUpdateAppAd() {
  const queryClient = useQueryClient()

  return useMutation<AppAd, Error, UpdateAppAdFormValues, UpdateAppAdContext>({
    mutationFn: updateAppAd,
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: APP_AD_QUERY_KEYS.lists() })
      const previousAppAds = queryClient.getQueryData<AppAd[]>(APP_AD_QUERY_KEYS.lists())

      queryClient.setQueryData<AppAd[]>(APP_AD_QUERY_KEYS.lists(), (old) =>
        old?.map((appAd) =>
          appAd.id === payload.id
            ? {
                ...appAd,
                ...(payload.name !== undefined ? { name: payload.name } : {}),
                ...(payload.status !== undefined ? { status: payload.status } : {}),
                ...(payload.budget !== undefined ? { budget: Number(payload.budget) || 0 } : {}),
              }
            : appAd
        )
      )

      return { previousAppAds }
    },
    onError: (_error, _payload, context) => {
      if (context?.previousAppAds) {
        queryClient.setQueryData(APP_AD_QUERY_KEYS.lists(), context.previousAppAds)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: APP_AD_QUERY_KEYS.lists() })
    },
  })
}
