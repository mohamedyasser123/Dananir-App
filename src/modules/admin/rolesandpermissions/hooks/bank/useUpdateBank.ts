import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateBank } from "../../services/bank.service"
import { BANK_QUERY_KEYS } from "../../constants/bank.constants"
import type { Bank } from "../../types/bank.types"
import type { UpdateBankFormValues } from "../../schemas/bank.schema"

interface UpdateBankContext {
  previousBanks?: Bank[]
}

export function useUpdateBank() {
  const queryClient = useQueryClient()

  return useMutation<Bank, Error, UpdateBankFormValues, UpdateBankContext>({
    mutationFn: updateBank,
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: BANK_QUERY_KEYS.lists() })
      const previousBanks = queryClient.getQueryData<Bank[]>(BANK_QUERY_KEYS.lists())

      queryClient.setQueryData<Bank[]>(BANK_QUERY_KEYS.lists(), (old) =>
        old?.map((bank) => (bank.id === payload.id ? { ...bank, ...payload } : bank))
      )

      return { previousBanks }
    },
    onError: (_error, _payload, context) => {
      if (context?.previousBanks) {
        queryClient.setQueryData(BANK_QUERY_KEYS.lists(), context.previousBanks)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: BANK_QUERY_KEYS.lists() })
    },
  })
}
