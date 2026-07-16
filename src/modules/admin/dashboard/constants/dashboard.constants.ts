import {
  Users, Building2, Landmark, DollarSign, ShoppingCart,
  Clock, FileText, AlertTriangle,
  type LucideIcon,
} from "lucide-react"
import type { StatCardId, RevenueCategory, ReminderUrgency, SystemAlertType, LoanRequestStatus } from "../types/dashboard.types"

export const DASHBOARD_QUERY_KEY = ["dashboard"] as const

export const STAT_CARD_STYLES: Record<StatCardId, { icon: LucideIcon; gradient: string; iconColor: string }> = {
  totalUsers: {
    icon: Users,
    gradient: "bg-[linear-gradient(to_right,#335DCB,#1E61F6)]",
    iconColor: "text-[#1E5CF6]",
  },
  companies: {
    icon: Building2,
    gradient: "bg-[linear-gradient(to_right,#ED1721,#F38B8B)]",
    iconColor: "text-[#F55B5B]",
  },
  banks: {
    icon: Landmark,
    gradient: "bg-[linear-gradient(to_right,#109842,#4BFD8D)]",
    iconColor: "text-[#1DD16A]",
  },
  totalLoan: {
    icon: DollarSign,
    gradient: "bg-[linear-gradient(to_right,#FF6505,#FFA86B)]",
    iconColor: "text-[#FF8811]",
  },
  totalOrders: {
    icon: ShoppingCart,
    gradient: "bg-[linear-gradient(to_right,#AD00FD,#D556FF)]",
    iconColor: "text-[#A825FC]",
  },
}

export const REVENUE_DISTRIBUTION_COLORS: Record<RevenueCategory, string> = {
  marketplace: "#2C4F93",
  loans: "#10B981",
  installments: "#F59E0B",
}

export const LOAN_STATUS_STYLES: Record<LoanRequestStatus, string> = {
  Approved: "bg-[#ECFDF5] text-[#10B981] border border-[#A7F3D0]/30",
  Pending: "bg-[#FFFBEB] text-[#F59E0B] border border-[#FEE685]",
  Rejected: "bg-[#FEF2F2] text-[#EF4444] border border-[#FCA5A5]/30",
}

export const REMINDER_STYLES: Record<ReminderUrgency, { cardBg: string; borderColor: string }> = {
  overdue: { cardBg: "bg-[#fed1d1]", borderColor: "border-[#FB2C36]" },
  today: { cardBg: "bg-[#f0dec9]", borderColor: "border-[#F59E0B]" },
  upcoming: { cardBg: "bg-white", borderColor: "border-[#99A1AF]" },
}

export const SYSTEM_ALERT_STYLES: Record<
  SystemAlertType,
  { icon: LucideIcon; bg: string; borderLeft: string; iconColor: string }
> = {
  merchant: { icon: FileText, bg: "#f0dec9", borderLeft: "#FF6900", iconColor: "#F54900" },
  overdue: { icon: AlertTriangle, bg: "#fed1d1", borderLeft: "#EF4444", iconColor: "#EF4444" },
  maintenance: { icon: Clock, bg: "#EFF6FF", borderLeft: "#3B82F6", iconColor: "#3B82F6" },
}
