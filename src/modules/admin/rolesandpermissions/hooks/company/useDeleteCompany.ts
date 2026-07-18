import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteCompany } from "../../services/company.service"
import { COMPANY_QUERY_KEYS } from "../../constants/company.constants"
import type { Company } from "../../types/company.types"

interface DeleteCompanyContext {
  previousCompanies?: Company[]
}

export function useDeleteCompany() {
  const queryClient = useQueryClient()

  return useMutation<{ id: string }, Error, string, DeleteCompanyContext>({
    mutationFn: deleteCompany,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: COMPANY_QUERY_KEYS.lists() })
      const previousCompanies = queryClient.getQueryData<Company[]>(COMPANY_QUERY_KEYS.lists())

      queryClient.setQueryData<Company[]>(COMPANY_QUERY_KEYS.lists(), (old) =>
        old?.filter((company) => company.id !== id)
      )

      return { previousCompanies }
    },
    onError: (_error, _id, context) => {
      if (context?.previousCompanies) {
        queryClient.setQueryData(COMPANY_QUERY_KEYS.lists(), context.previousCompanies)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: COMPANY_QUERY_KEYS.lists() })
    },
  })
}
