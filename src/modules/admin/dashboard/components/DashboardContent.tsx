import type { DashboardData } from "../types/dashboard.types"
import { isDashboardEmpty } from "../utils/dashboard.utils"
import DashboardSkeleton from "./DashboardSkeleton"
import DashboardError from "./DashboardError"
import DashboardEmpty from "./DashboardEmpty"
import StatsSection from "./StatsSection"
import AnalyticsSection from "./AnalyticsSection"
import FinancialOverviewSection from "./FinancialOverviewSection"
import SystemAlertsSection from "./SystemAlertsSection"

interface DashboardContentProps {
  data: DashboardData | undefined
  isLoading: boolean
  isError: boolean
  error: Error | null
  refetch: () => void
}

export default function DashboardContent({ data, isLoading, isError, error, refetch }: DashboardContentProps) {
  if (isLoading) return <DashboardSkeleton />
  if (isError) return <DashboardError message={error?.message} onRetry={refetch} />
  if (!data || isDashboardEmpty(data)) return <DashboardEmpty />

  return (
    <>
      <StatsSection stats={data.stats} />
      <AnalyticsSection topMerchants={data.topMerchants} revenueDistribution={data.revenueDistribution} />
      <FinancialOverviewSection revenueChart={data.revenueChart} loanRequests={data.loanRequests} />
      <SystemAlertsSection paymentReminders={data.paymentReminders} systemAlerts={data.systemAlerts} />
    </>
  )
}
