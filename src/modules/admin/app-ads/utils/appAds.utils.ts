import type { AppAd } from "../types/appAds.types"

export function filterAppAds(appAds: AppAd[], search: string): AppAd[] {
  const term = search.trim().toLowerCase()
  if (!term) return appAds

  return appAds.filter((appAd) => appAd.name.toLowerCase().includes(term))
}

export function isAppAdsEmpty(appAds: AppAd[]): boolean {
  return appAds.length === 0
}
