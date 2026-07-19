import EmailsSkeleton from "./EmailsSkeleton"
import EmailsError from "./EmailsError"
import EmailsEmpty from "./EmailsEmpty"
import { isEmailsEmpty } from "../../utils/communication.utils"
import type { UseEmailsResult } from "../../hooks/emails/useEmails"
import EmailStatsSection from "./EmailStatsSection"
import EmailDashboard from "./EmailDashboard"

export default function EmailsContent({ data, isLoading, isError, error, refetch }: UseEmailsResult) {
  if (isLoading) return <EmailsSkeleton />
  if (isError) return <EmailsError message={error?.message} onRetry={refetch} />
  if (!data || isEmailsEmpty(data)) return <EmailsEmpty />

  return (
    <>
      <EmailStatsSection />
      <EmailDashboard emails={data} />
    </>
  )
}
