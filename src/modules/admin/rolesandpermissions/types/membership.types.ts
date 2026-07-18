export interface MembershipPlan {
  id: string
  name: string
  price: string
  activeUsers: string
  headerBg: string
  isPopular: boolean
  features: string[]
}

export interface Subscription {
  id: string
  name: string
  initials: string
  plan: string
  date: string
  price: string
}
