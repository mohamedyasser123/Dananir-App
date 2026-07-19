import NotificationsSkeleton from "./NotificationsSkeleton"
import NotificationsError from "./NotificationsError"
import NotificationsEmpty from "./NotificationsEmpty"
import { isNotificationsEmpty } from "../../utils/communication.utils"
import type { UseNotificationsResult } from "../../hooks/notifications/useNotifications"
import { useCreateNotification } from "../../hooks/notifications/useCreateNotification"
import { useMarkAllNotificationsRead } from "../../hooks/notifications/useMarkAllNotificationsRead"
import EmailStatsSection from "../emails/EmailStatsSection"
import NotificationsHeader from "./NotificationsHeader"
import RecentActivities from "./RecentActivities"
import CreateNotificationDashboard from "./SendNotificationForm"

export default function NotificationsContent({ data, isLoading, isError, error, refetch }: UseNotificationsResult) {
  const createNotification = useCreateNotification()
  const markAllRead = useMarkAllNotificationsRead()

  if (isLoading) return <NotificationsSkeleton />
  if (isError) return <NotificationsError message={error?.message} onRetry={refetch} />
  if (!data || isNotificationsEmpty(data)) return <NotificationsEmpty />

  const unreadCount = data.filter((notification) => notification.isUnread).length

  return (
    <>
      <NotificationsHeader unreadCount={unreadCount} onMarkAllRead={() => markAllRead.mutate()} />
      <EmailStatsSection />
      <RecentActivities activities={data} />
      <CreateNotificationDashboard
        onSubmit={(values) => createNotification.mutate(values)}
        submitting={createNotification.isPending}
      />
    </>
  )
}
