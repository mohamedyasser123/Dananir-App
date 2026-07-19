import EmailsContent from "../../components/emails/EmailsContent"
import { useEmails } from "../../hooks/emails/useEmails"

export default function EmailsPage() {
  const emails = useEmails()

  return <EmailsContent {...emails} />
}
