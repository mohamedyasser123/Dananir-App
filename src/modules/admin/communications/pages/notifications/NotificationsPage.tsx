import NotificationsContent from "../../components/notifications/NotificationsContent"
import { useNotifications } from "../../hooks/notifications/useNotifications"

export default function NotificationsPage() {
  const notifications = useNotifications()

  return <NotificationsContent {...notifications} />
}
