import type { MembershipPlan, Subscription } from "../types/membership.types"
import type { CreateMembershipPlanFormValues, UpdateMembershipPlanFormValues } from "../schemas/membership.schema"

const NETWORK_DELAY_MS = 600

function delay<T>(data: T, ms = NETWORK_DELAY_MS): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms))
}

let membershipPlans: MembershipPlan[] = [
  {
    id: "1",
    name: "Basic",
    price: "$9.99",
    activeUsers: "2,450",
    headerBg: "bg-[#4A5568]",
    isPopular: false,
    features: ["Up to 5 users", "10 GB storage", "Basic analytics", "Email support", "Mobile app access"],
  },
  {
    id: "2",
    name: "Professional",
    price: "$29.99",
    activeUsers: "4,250",
    headerBg: "bg-[#1A68F5]",
    isPopular: true,
    features: [
      "Up to 20 users",
      "100 GB storage",
      "Advanced analytics",
      "Priority support",
      "API access",
      "Custom integrations",
    ],
  },
  {
    id: "3",
    name: "Enterprise",
    price: "$99.99",
    activeUsers: "1,850",
    headerBg: "bg-[#9333EA]",
    isPopular: false,
    features: [
      "Unlimited users",
      "Unlimited storage",
      "Real-time analytics",
      "24/7 dedicated support",
      "Advanced API access",
      "Custom development",
      "SLA guarantee",
      "White-label solution",
    ],
  },
  {
    id: "4",
    name: "Premium",
    price: "$49.99",
    activeUsers: "3,200",
    headerBg: "bg-[#C28100]",
    isPopular: false,
    features: [
      "Up to 50 users",
      "500 GB storage",
      "Premium analytics",
      "Phone & email support",
      "Advanced API access",
      "Priority features",
      "Custom branding",
    ],
  },
]

let subscriptions: Subscription[] = [
  { id: "1", name: "John Smith", initials: "JS", plan: "Professional Plan", date: "2026-03-23", price: "$29.99" },
  { id: "2", name: "Sarah Johnson", initials: "SJ", plan: "Basic Plan", date: "2026-03-23", price: "$9.99" },
  { id: "3", name: "Michael Chen", initials: "MC", plan: "Enterprise Plan", date: "2026-03-22", price: "$99.99" },
  { id: "4", name: "Emma Wilson", initials: "EW", plan: "Premium Plan", date: "2026-03-22", price: "$49.99" },
  { id: "5", name: "David Brown", initials: "DB", plan: "Professional Plan", date: "2026-03-21", price: "$29.99" },
]

function generateId(): string {
  const maxId = membershipPlans.reduce((max, plan) => Math.max(max, Number(plan.id) || 0), 0)
  return (maxId + 1).toString()
}

function parseFeatures(features?: string): string[] {
  if (!features) return []
  return features
    .split(",")
    .map((feature) => feature.trim())
    .filter(Boolean)
}

export async function getMembershipPlans(): Promise<MembershipPlan[]> {
  return delay([...membershipPlans])
}

export async function getMembershipPlanById(id: string): Promise<MembershipPlan> {
  const plan = membershipPlans.find((item) => item.id === id)
  if (!plan) {
    throw new Error(`Membership plan with id "${id}" was not found`)
  }
  return delay(plan)
}

export async function createMembershipPlan(payload: CreateMembershipPlanFormValues): Promise<MembershipPlan> {
  const newPlan: MembershipPlan = {
    id: generateId(),
    name: payload.name,
    price: payload.price,
    activeUsers: payload.activeUsers ?? "0",
    headerBg: payload.headerBg ?? "bg-[#4A5568]",
    isPopular: payload.isPopular ?? false,
    features: parseFeatures(payload.features),
  }
  membershipPlans = [...membershipPlans, newPlan]
  return delay(newPlan)
}

export async function updateMembershipPlan(payload: UpdateMembershipPlanFormValues): Promise<MembershipPlan> {
  const existing = membershipPlans.find((plan) => plan.id === payload.id)
  if (!existing) {
    throw new Error(`Membership plan with id "${payload.id}" was not found`)
  }

  const updated: MembershipPlan = {
    ...existing,
    ...payload,
    features: payload.features !== undefined ? parseFeatures(payload.features) : existing.features,
  }
  membershipPlans = membershipPlans.map((plan) => (plan.id === payload.id ? updated : plan))
  return delay(updated)
}

export async function deleteMembershipPlan(id: string): Promise<{ id: string }> {
  membershipPlans = membershipPlans.filter((plan) => plan.id !== id)
  return delay({ id })
}

export async function getRecentSubscriptions(): Promise<Subscription[]> {
  return delay([...subscriptions])
}
