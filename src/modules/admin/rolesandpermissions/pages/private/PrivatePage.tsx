import PrivateContent from "../../components/PrivateContent"
import { usePrivateUsers } from "../../hooks/private/usePrivateUsers"

export default function PrivatePage() {
  const privateUsers = usePrivateUsers()

  return <PrivateContent {...privateUsers} />
}
