import { useParams } from "react-router-dom"
import { useCompany } from "../../hooks/company/useCompany"
import CompanyDetailsContent from "../../component/companycomponent/CompanyDetailsContent"


export default function CompanyDetailsPage() {
  const { id } = useParams()
  const company = useCompany(id)

  return <CompanyDetailsContent {...company} />
}
