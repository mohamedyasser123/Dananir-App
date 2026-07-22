import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createBank } from "../../services/bank.service"
import { BANK_QUERY_KEYS } from "../../constants/bank.constants"

export function useCreateBank() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createBank,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BANK_QUERY_KEYS.lists() })
    },
  })
}
