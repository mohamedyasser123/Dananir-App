import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteNotification } from "../../services/communication.service"
import { NOTIFICATION_QUERY_KEYS } from "../../constants/communication.constants"
import type { Notification } from "../../types/communication.types"

interface DeleteNotificationContext {
  previousNotifications?: Notification[]
}

export function useDeleteNotification() {
  const queryClient = useQueryClient()

  return useMutation<{ id: string }, Error, string, DeleteNotificationContext>({
    mutationFn: deleteNotification,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: NOTIFICATION_QUERY_KEYS.lists() })
      const previousNotifications = queryClient.getQueryData<Notification[]>(NOTIFICATION_QUERY_KEYS.lists())

      queryClient.setQueryData<Notification[]>(NOTIFICATION_QUERY_KEYS.lists(), (old) =>
        old?.filter((notification) => notification.id !== id)
      )

      return { previousNotifications }
    },
    onError: (_error, _id, context) => {
      if (context?.previousNotifications) {
        queryClient.setQueryData(NOTIFICATION_QUERY_KEYS.lists(), context.previousNotifications)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATION_QUERY_KEYS.lists() })
    },
  })
}
