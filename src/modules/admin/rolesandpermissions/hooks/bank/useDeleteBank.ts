import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteBank } from "../../services/bank.service"
import { BANK_QUERY_KEYS } from "../../constants/bank.constants"
import type { Bank } from "../../types/bank.types"

interface DeleteBankContext {
  previousBanks?: Bank[]
}

export function useDeleteBank() {
  const queryClient = useQueryClient()

  return useMutation<{ id: string }, Error, string, DeleteBankContext>({
    mutationFn: deleteBank,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: BANK_QUERY_KEYS.lists() })
      const previousBanks = queryClient.getQueryData<Bank[]>(BANK_QUERY_KEYS.lists())

      queryClient.setQueryData<Bank[]>(BANK_QUERY_KEYS.lists(), (old) =>
        old?.filter((bank) => bank.id !== id)
      )

      return { previousBanks }
    },
    onError: (_error, _id, context) => {
      if (context?.previousBanks) {
        queryClient.setQueryData(BANK_QUERY_KEYS.lists(), context.previousBanks)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: BANK_QUERY_KEYS.lists() })
    },
  })
}
