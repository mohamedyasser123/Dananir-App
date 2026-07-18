import { useQuery } from "@tanstack/react-query"
import { getBankById } from "../../services/bank.service"
import { BANK_QUERY_KEYS } from "../../constants/bank.constants"

export function useBank(id: string | undefined) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: BANK_QUERY_KEYS.detail(id ?? ""),
    queryFn: () => getBankById(id as string),
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

export type UseBankResult = ReturnType<typeof useBank>
