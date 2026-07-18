import CompanyContent from "../../components/CompanyContent"
import { useCompanies } from "../../hooks/company/useCompanies"

export default function CompanyPage() {
  const companies = useCompanies()

  return <CompanyContent {...companies} />
}
