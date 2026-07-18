import MembershipContent from "../../components/MembershipContent"
import { useMembershipPlans } from "../../hooks/membership/useMembershipPlans"
import { useRecentSubscriptions } from "../../hooks/membership/useRecentSubscriptions"

export default function MembershipsPage() {
  const plans = useMembershipPlans()
  const subscriptions = useRecentSubscriptions()

  return <MembershipContent plans={plans} subscriptions={subscriptions} />
}
