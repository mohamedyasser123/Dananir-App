import SmsContent from "../../components/sms/SmsContent"
import { useSms } from "../../hooks/sms/useSms"

export default function SmsPage() {
  const sms = useSms()

  return <SmsContent {...sms} />
}
