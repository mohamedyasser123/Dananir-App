import type { MembershipPlan, Subscription } from "../types/membership.types"

export function filterMembershipPlans(plans: MembershipPlan[], search: string): MembershipPlan[] {
  const term = search.trim().toLowerCase()
  if (!term) return plans

  return plans.filter((plan) => plan.name.toLowerCase().includes(term))
}

export function isMembershipPlansEmpty(plans: MembershipPlan[]): boolean {
  return plans.length === 0
}

export function isSubscriptionsEmpty(subscriptions: Subscription[]): boolean {
  return subscriptions.length === 0
}
