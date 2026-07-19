import AppAdsContent from "../components/AppAdsContent"
import { useAppAds } from "../hooks/useAppAds"

export default function AppAdsPage() {
  const appAds = useAppAds()

  return <AppAdsContent {...appAds} />
}
