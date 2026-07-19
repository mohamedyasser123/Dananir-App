import { useQuery } from "@tanstack/react-query"
import { getNotificationById } from "../../services/communication.service"
import { NOTIFICATION_QUERY_KEYS } from "../../constants/communication.constants"

export function useNotification(id: string | undefined) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: NOTIFICATION_QUERY_KEYS.detail(id ?? ""),
    queryFn: () => getNotificationById(id as string),
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

export type UseNotificationResult = ReturnType<typeof useNotification>
