import type { AppAd, AppAdDetails } from "../types/appAds.types"
import type { CreateAppAdFormValues, UpdateAppAdFormValues } from "../schemas/appAds.schema"

const NETWORK_DELAY_MS = 600

function delay<T>(data: T, ms = NETWORK_DELAY_MS): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms))
}

let appAds: AppAd[] = [
  { id: "1", name: "Spring Sale 2026", budget: 5000, spent: 3250, impressions: 125000, clicks: 4250, ctr: 3.4, status: "ACTIVE" },
  { id: "2", name: "Product Launch - Premium", budget: 10000, spent: 8900, impressions: 287000, clicks: 9850, ctr: 3.4, status: "ACTIVE" },
  { id: "3", name: "Summer Preview", budget: 3000, spent: 3000, impressions: 98000, clicks: 2450, ctr: 2.5, status: "COMPLETED" },
  { id: "4", name: "Mobile App Promotion", budget: 7500, spent: 2100, impressions: 67000, clicks: 1890, ctr: 2.8, status: "ACTIVE" },
  { id: "5", name: "Black Friday Early Bird", budget: 15000, spent: 0, impressions: 0, clicks: 0, ctr: 0, status: "SCHEDULED" },
]

const appAdDetailsMeta: Record<string, { createdAt: string; lastActivityAt: string | null }> = {
  "1": { createdAt: "2026-02-10T09:00:00.000Z", lastActivityAt: "2026-07-15T08:30:00.000Z" },
  "2": { createdAt: "2026-02-20T11:15:00.000Z", lastActivityAt: "2026-07-16T14:05:00.000Z" },
  "3": { createdAt: "2026-01-05T13:40:00.000Z", lastActivityAt: "2026-03-01T09:12:00.000Z" },
  "4": { createdAt: "2026-03-18T08:20:00.000Z", lastActivityAt: "2026-07-13T17:20:00.000Z" },
  "5": { createdAt: "2026-06-01T08:20:00.000Z", lastActivityAt: null },
}

function generateId(): string {
  const maxId = appAds.reduce((max, appAd) => Math.max(max, Number(appAd.id) || 0), 0)
  return (maxId + 1).toString()
}

export async function getAppAds(): Promise<AppAd[]> {
  return delay([...appAds])
}

export async function getAppAdById(id: string): Promise<AppAdDetails> {
  const appAd = appAds.find((item) => item.id === id)
  if (!appAd) {
    throw new Error(`App ad with id "${id}" was not found`)
  }

  const meta = appAdDetailsMeta[id] ?? { createdAt: new Date().toISOString(), lastActivityAt: null }

  return delay({
    ...appAd,
    createdAt: meta.createdAt,
    lastActivityAt: meta.lastActivityAt,
  })
}

export async function createAppAd(payload: CreateAppAdFormValues): Promise<AppAd> {
  const newAppAd: AppAd = {
    id: generateId(),
    name: payload.name,
    status: payload.status,
    budget: Number(payload.budget) || 0,
    spent: 0,
    impressions: 0,
    clicks: 0,
    ctr: 0,
  }
  appAds = [...appAds, newAppAd]
  return delay(newAppAd)
}

export async function updateAppAd(payload: UpdateAppAdFormValues): Promise<AppAd> {
  const existing = appAds.find((appAd) => appAd.id === payload.id)
  if (!existing) {
    throw new Error(`App ad with id "${payload.id}" was not found`)
  }

  const updated: AppAd = {
    ...existing,
    ...(payload.name !== undefined ? { name: payload.name } : {}),
    ...(payload.status !== undefined ? { status: payload.status } : {}),
    ...(payload.budget !== undefined ? { budget: Number(payload.budget) || 0 } : {}),
  }
  appAds = appAds.map((appAd) => (appAd.id === payload.id ? updated : appAd))
  return delay(updated)
}

export async function deleteAppAd(id: string): Promise<{ id: string }> {
  appAds = appAds.filter((appAd) => appAd.id !== id)
  return delay({ id })
}
