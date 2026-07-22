import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateCompany } from "../../services/company.service"
import { COMPANY_QUERY_KEYS } from "../../constants/company.constants"
import type { Company } from "../../types/company.types"
import type { UpdateCompanyFormValues } from "../../schemas/company.schema"

interface UpdateCompanyContext {
  previousCompanies?: Company[]
}

export function useUpdateCompany() {
  const queryClient = useQueryClient()

  return useMutation<Company, Error, UpdateCompanyFormValues, UpdateCompanyContext>({
    mutationFn: updateCompany,
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: COMPANY_QUERY_KEYS.lists() })
      const previousCompanies = queryClient.getQueryData<Company[]>(COMPANY_QUERY_KEYS.lists())

      queryClient.setQueryData<Company[]>(COMPANY_QUERY_KEYS.lists(), (old) =>
        old?.map((company) => (company.id === payload.id ? { ...company, ...payload } : company))
      )

      return { previousCompanies }
    },
    onError: (_error, _payload, context) => {
      if (context?.previousCompanies) {
        queryClient.setQueryData(COMPANY_QUERY_KEYS.lists(), context.previousCompanies)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: COMPANY_QUERY_KEYS.lists() })
    },
  })
}
