import { useQuery } from "@tanstack/react-query"
import { getEmailById } from "../../services/communication.service"
import { EMAIL_QUERY_KEYS } from "../../constants/communication.constants"

export function useEmail(id: string | undefined) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: EMAIL_QUERY_KEYS.detail(id ?? ""),
    queryFn: () => getEmailById(id as string),
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

export type UseEmailResult = ReturnType<typeof useEmail>
