export type AppAdStatus = "ACTIVE" | "COMPLETED" | "SCHEDULED"

export interface AppAd {
  id: string
  name: string
  budget: number
  spent: number
  impressions: number
  clicks: number
  ctr: number
  status: AppAdStatus
}

export interface AppAdDetails extends AppAd {
  createdAt: string
  lastActivityAt: string | null
}
