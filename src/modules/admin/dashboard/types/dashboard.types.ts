export type TrendDirection = "up" | "down"

export interface StatTrend {
  value: string
  direction: TrendDirection
}

export type StatCardId = "totalUsers" | "companies" | "banks" | "totalLoan" | "totalOrders"

export interface StatCardData {
  id: StatCardId
  title: string
  value: string
  trend?: StatTrend
}

export interface RevenuePoint {
  month: string
  revenue: number
  loans: number
}

export type LoanRequestStatus = "Approved" | "Pending" | "Rejected"

export interface LoanRequest {
  id: number
  customerName: string
  amount: string
  status: LoanRequestStatus
}

export type RevenueCategory = "marketplace" | "loans" | "installments"

export interface RevenueDistributionSlice {
  category: RevenueCategory
  label: string
  value: number
}

export interface TopMerchant {
  id: string
  name: string
  amount: string
  progress: number
}

export type ReminderUrgency = "overdue" | "today" | "upcoming"

export interface PaymentReminder {
  id: number
  customerName: string
  amount: string
  timeText: string
  urgency: ReminderUrgency
}

export type SystemAlertType = "merchant" | "overdue" | "maintenance"

export interface SystemAlert {
  id: number
  type: SystemAlertType
  title: string
  description: string
  time: string
}

export interface DashboardData {
  stats: StatCardData[]
  revenueChart: RevenuePoint[]
  loanRequests: LoanRequest[]
  topMerchants: TopMerchant[]
  revenueDistribution: RevenueDistributionSlice[]
  paymentReminders: PaymentReminder[]
  systemAlerts: SystemAlert[]
}
