import { useQuery } from "@tanstack/react-query"
import { getSms } from "../../services/communication.service"
import { SMS_QUERY_KEYS } from "../../constants/communication.constants"

export function useSms() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: SMS_QUERY_KEYS.lists(),
    queryFn: getSms,
  })

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
  }
}

export type UseSmsResult = ReturnType<typeof useSms>
