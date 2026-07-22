import { Link } from "react-router-dom"
import { ArrowLeft, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { UsePrivateUserResult } from "../../hooks/private/usePrivateUser"
import PrivateDetailsSkeleton from "./PrivateDetailsSkeleton"
import PrivateDetailsError from "./PrivateDetailsError"
import PrivateDetailsEmpty from "./PrivateDetailsEmpty"
import UserProfileHeader from "./UserProfileHeader"
import FinancialOverviewTabs from "./FinancialOverviewTabs"

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[11px] font-bold uppercase tracking-wider text-[#99A1AF]">{label}</span>
      <span className="text-[14px] font-semibold text-[#101828]">{value}</span>
    </div>
  )
}

export default function PrivateDetailsContent({ data, isLoading, isError, error, refetch }: UsePrivateUserResult) {
  if (isLoading) return <PrivateDetailsSkeleton />
  if (isError) return <PrivateDetailsError message={error?.message} onRetry={refetch} />
  if (!data) return <PrivateDetailsEmpty />

  return (
    <>
    <UserProfileHeader/>
    <FinancialOverviewTabs/>
    </>
  )
}
