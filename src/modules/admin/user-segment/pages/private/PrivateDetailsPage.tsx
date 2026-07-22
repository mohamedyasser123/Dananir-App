import { useParams } from "react-router-dom"
import PrivateDetailsContent from "../../component/privatecomponent/PrivateDetailsContent"
import { usePrivateUser } from "../../hooks/private/usePrivateUser"

export default function PrivateDetailsPage() {
  const { id } = useParams()
  const user = usePrivateUser(id)

  return <PrivateDetailsContent {...user} />
}
