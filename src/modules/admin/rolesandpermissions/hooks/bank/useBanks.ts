import { useQuery } from "@tanstack/react-query"
import { getBanks } from "../../services/bank.service"
import { BANK_QUERY_KEYS } from "../../constants/bank.constants"

export function useBanks() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: BANK_QUERY_KEYS.lists(),
    queryFn: getBanks,
  })

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
  }
}

export type UseBanksResult = ReturnType<typeof useBanks>
