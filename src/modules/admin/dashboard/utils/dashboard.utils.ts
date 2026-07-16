import type { DashboardData, RevenueDistributionSlice } from "../types/dashboard.types"

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value)
}

export function formatCurrency(value: number): string {
  return `$${formatNumber(value)}`
}

export function formatCompactCurrency(value: number): string {
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}k`
  }
  return formatCurrency(value)
}

export function getTotalRevenue(slices: RevenueDistributionSlice[]): number {
  return slices.reduce((sum, slice) => sum + slice.value, 0)
}

export function getRevenueSharePercentage(slice: RevenueDistributionSlice, slices: RevenueDistributionSlice[]): string {
  const total = getTotalRevenue(slices)
  if (total === 0) return "0%"
  return `${((slice.value / total) * 100).toFixed(1)}%`
}

export function isDashboardEmpty(data: DashboardData): boolean {
  return (
    data.stats.length === 0 &&
    data.revenueChart.length === 0 &&
    data.loanRequests.length === 0 &&
    data.topMerchants.length === 0 &&
    data.revenueDistribution.length === 0 &&
    data.paymentReminders.length === 0 &&
    data.systemAlerts.length === 0
  )
}
