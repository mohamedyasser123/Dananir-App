import { useParams } from "react-router-dom"
import CompanyDetailsContent from "../../components/CompanyDetailsContent"
import { useCompany } from "../../hooks/company/useCompany"

export default function CompanyDetailsPage() {
  const { id } = useParams()
  const company = useCompany(id)

  return <CompanyDetailsContent {...company} />
}
