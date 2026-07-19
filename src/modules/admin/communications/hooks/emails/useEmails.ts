import { useQuery } from "@tanstack/react-query"
import { getEmails } from "../../services/communication.service"
import { EMAIL_QUERY_KEYS } from "../../constants/communication.constants"

export function useEmails() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: EMAIL_QUERY_KEYS.lists(),
    queryFn: getEmails,
  })

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
  }
}

export type UseEmailsResult = ReturnType<typeof useEmails>
