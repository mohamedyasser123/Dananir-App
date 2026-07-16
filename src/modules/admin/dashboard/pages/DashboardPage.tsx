import DashboardContent from '../components/DashboardContent'
import { useDashboard } from '../hooks/useDashboard'

export default function DashboardPage() {
  const dashboard = useDashboard()

  return <DashboardContent {...dashboard} />
}
