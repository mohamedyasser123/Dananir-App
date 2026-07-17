import type { UseAdminResult } from "../hooks/useAdmin"
import AdminDetailsSkeleton from "./AdminDetailsSkeleton"
import AdminDetailsError from "./AdminDetailsError"
import AdminDetailsEmpty from "./AdminDetailsEmpty"
import AdminOverviewHeader from "./AdminOverviewHeader"
import DashboardInsightsSection from "./DashboardInsightsSection"
import AnalyticsDashboardAdminSection from "./AnalyticsDashboardAdminSection"
import WeeklyActivityChart from "./WeeklyActivityChart"
import CompanyListTable from "./CompanyListTable"

export default function AdminDetailsContent({ data, isLoading, isError, error, refetch }: UseAdminResult) {
  if (isLoading) return <AdminDetailsSkeleton />
  if (isError) return <AdminDetailsError message={error?.message} onRetry={refetch} />
  if (!data) return <AdminDetailsEmpty />

  return (
    <>
    <AdminOverviewHeader/>
    <DashboardInsightsSection/>
    <AnalyticsDashboardAdminSection/>
    <WeeklyActivityChart/>
    <CompanyListTable/>
    </>
  )
}
