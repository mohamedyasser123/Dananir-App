import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createCompany } from "../../services/company.service"
import { COMPANY_QUERY_KEYS } from "../../constants/company.constants"

export function useCreateCompany() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COMPANY_QUERY_KEYS.lists() })
    },
  })
}
