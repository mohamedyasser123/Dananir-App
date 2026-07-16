import { formatCurrency, formatNumber } from "../utils/dashboard.utils"
import type { DashboardData } from "../types/dashboard.types"

const NETWORK_DELAY_MS = 700

function delay<T>(data: T, ms = NETWORK_DELAY_MS): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms))
}

const MOCK_DASHBOARD_DATA: DashboardData = {
  stats: [
    {
      id: "totalUsers",
      title: "Total Users",
      value: formatNumber(12500),
      trend: { value: "+8.5%", direction: "up" },
    },
    {
      id: "companies",
      title: "Companies",
      value: formatNumber(320),
      trend: { value: "+8.5%", direction: "up" },
    },
    {
      id: "banks",
      title: "Banks",
      value: formatNumber(320),
    },
    {
      id: "totalLoan",
      title: "Total Loan",
      value: formatCurrency(87500),
      trend: { value: "+12%", direction: "up" },
    },
    {
      id: "totalOrders",
      title: "Total Orders",
      value: formatNumber(5680),
      trend: { value: "-2.1%", direction: "down" },
    },
  ],
  revenueChart: [
    { month: "Jan", revenue: 185000, loans: 120000 },
    { month: "Feb", revenue: 198000, loans: 135000 },
    { month: "Mar", revenue: 225000, loans: 148000 },
    { month: "Apr", revenue: 242000, loans: 162000 },
    { month: "May", revenue: 270000, loans: 178000 },
    { month: "Jun", revenue: 288000, loans: 195000 },
  ],
  loanRequests: [
    { id: 1, customerName: "Sarah Mitchell", amount: formatCurrency(25000), status: "Approved" },
    { id: 2, customerName: "James Anderson", amount: formatCurrency(18500), status: "Pending" },
    { id: 3, customerName: "Emily Chen", amount: formatCurrency(32000), status: "Approved" },
    { id: 4, customerName: "Michael Roberts", amount: formatCurrency(15000), status: "Rejected" },
    { id: 5, customerName: "Lisa Thompson", amount: formatCurrency(28500), status: "Pending" },
    { id: 6, customerName: "David Park", amount: formatCurrency(42000), status: "Approved" },
  ],
  topMerchants: [
    { id: "#1", name: "TechMart Electronic", amount: formatCurrency(145800), progress: 85 },
    { id: "#2", name: "Premium Fashion Hul", amount: formatCurrency(128500), progress: 72 },
    { id: "#3", name: "Global Food Market", amount: formatCurrency(112300), progress: 60 },
    { id: "#4", name: "Home & Living Store", amount: formatCurrency(98700), progress: 50 },
    { id: "#5", name: "Sports & Fitness Co", amount: formatCurrency(87400), progress: 40 },
  ],
  revenueDistribution: [
    { category: "marketplace", label: "Marketplace", value: 385000 },
    { category: "loans", label: "Loans", value: 268000 },
    { category: "installments", label: "Installments", value: 195000 },
  ],
  paymentReminders: [
    { id: 1, customerName: "Robert Williams", amount: formatCurrency(2400), timeText: "Overdue", urgency: "overdue" },
    { id: 2, customerName: "Jennifer Davis", amount: formatCurrency(1850), timeText: "Today", urgency: "today" },
    { id: 3, customerName: "Mark Johnson", amount: formatCurrency(3200), timeText: "2 days", urgency: "upcoming" },
    { id: 4, customerName: "Amanda Brown", amount: formatCurrency(1500), timeText: "5 days", urgency: "upcoming" },
  ],
  systemAlerts: [
    {
      id: 1,
      type: "merchant",
      title: "New Merchant Application",
      description: "Premium Fashion Hub submitted for approval",
      time: "15 min ago",
    },
    {
      id: 2,
      type: "overdue",
      title: "Overdue Installments Alert",
      description: "12 customers have overdue payments",
      time: "1 hour ago",
    },
    {
      id: 3,
      type: "maintenance",
      title: "System Maintenance Scheduled",
      description: "Scheduled for tonight at 2:00 AM",
      time: "2 hours ago",
    },
  ],
}

export async function getDashboardData(): Promise<DashboardData> {
  return delay(MOCK_DASHBOARD_DATA)
}
