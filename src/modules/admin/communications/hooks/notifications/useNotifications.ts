import { useQuery } from "@tanstack/react-query"
import { getNotifications } from "../../services/communication.service"
import { NOTIFICATION_QUERY_KEYS } from "../../constants/communication.constants"

export function useNotifications() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: NOTIFICATION_QUERY_KEYS.lists(),
    queryFn: getNotifications,
  })

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
  }
}

export type UseNotificationsResult = ReturnType<typeof useNotifications>
