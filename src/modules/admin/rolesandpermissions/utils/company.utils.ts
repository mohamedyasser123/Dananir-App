import type { Company, CompanyStatus } from "../types/company.types"

export function filterCompanies(companies: Company[], search: string, status?: CompanyStatus): Company[] {
  const term = search.trim().toLowerCase()

  return companies
    .filter((company) => !status || company.status === status)
    .filter(
      (company) =>
        !term ||
        company.companyName.toLowerCase().includes(term) ||
        company.email.toLowerCase().includes(term)
    )
}

export function isCompaniesEmpty(companies: Company[]): boolean {
  return companies.length === 0
}
