import { useMutation, useQueryClient } from "@tanstack/react-query"
import { markAllNotificationsRead } from "../../services/communication.service"
import { NOTIFICATION_QUERY_KEYS } from "../../constants/communication.constants"
import type { Notification } from "../../types/communication.types"

interface MarkAllNotificationsReadContext {
  previousNotifications?: Notification[]
}

export function useMarkAllNotificationsRead() {
  const queryClient = useQueryClient()

  return useMutation<Notification[], Error, void, MarkAllNotificationsReadContext>({
    mutationFn: markAllNotificationsRead,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: NOTIFICATION_QUERY_KEYS.lists() })
      const previousNotifications = queryClient.getQueryData<Notification[]>(NOTIFICATION_QUERY_KEYS.lists())

      queryClient.setQueryData<Notification[]>(NOTIFICATION_QUERY_KEYS.lists(), (old) =>
        old?.map((notification) => ({ ...notification, isUnread: false }))
      )

      return { previousNotifications }
    },
    onError: (_error, _payload, context) => {
      if (context?.previousNotifications) {
        queryClient.setQueryData(NOTIFICATION_QUERY_KEYS.lists(), context.previousNotifications)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATION_QUERY_KEYS.lists() })
    },
  })
}
