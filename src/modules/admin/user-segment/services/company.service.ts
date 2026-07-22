import type { Company, CompanyDetails } from "../types/company.types"
import type { CreateCompanyFormValues, UpdateCompanyFormValues } from "../schemas/company.schema"

const NETWORK_DELAY_MS = 600

function delay<T>(data: T, ms = NETWORK_DELAY_MS): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms))
}

let companies: Company[] = [
  { id: "1", companyName: "First National Bank", email: "contact@fnb.com", city: "USA", status: "Active" },
  { id: "2", companyName: "Global Trust Bank", email: "contact@globaltrust.com", city: "UK", status: "Active" },
  { id: "3", companyName: "Capital Finance Bank", email: "contact@capitalfinance.com", city: "USA", status: "Active" },
  { id: "4", companyName: "Precision Ledger", email: "contact@precisionledger.io", city: "UK", status: "Inactive" },
]

const companyDetailsMeta: Record<string, { createdAt: string; lastActivityAt: string | null }> = {
  "1": { createdAt: "2023-01-10T09:00:00.000Z", lastActivityAt: "2026-07-15T08:30:00.000Z" },
  "2": { createdAt: "2023-03-22T11:15:00.000Z", lastActivityAt: "2026-07-16T14:05:00.000Z" },
  "3": { createdAt: "2023-05-02T13:40:00.000Z", lastActivityAt: "2026-07-14T09:12:00.000Z" },
  "4": { createdAt: "2023-06-18T08:20:00.000Z", lastActivityAt: null },
}

function generateId(): string {
  const maxId = companies.reduce((max, company) => Math.max(max, Number(company.id) || 0), 0)
  return (maxId + 1).toString()
}

export async function getCompanies(): Promise<Company[]> {
  return delay([...companies])
}

export async function getCompanyById(id: string): Promise<CompanyDetails> {
  const company = companies.find((item) => item.id === id)
  if (!company) {
    throw new Error(`Company with id "${id}" was not found`)
  }

  const meta = companyDetailsMeta[id] ?? { createdAt: new Date().toISOString(), lastActivityAt: null }

  return delay({
    ...company,
    createdAt: meta.createdAt,
    lastActivityAt: meta.lastActivityAt,
  })
}

export async function createCompany(payload: CreateCompanyFormValues): Promise<Company> {
  const newCompany: Company = { id: generateId(), status: "Active", ...payload }
  companies = [...companies, newCompany]
  return delay(newCompany)
}

export async function updateCompany(payload: UpdateCompanyFormValues): Promise<Company> {
  const existing = companies.find((company) => company.id === payload.id)
  if (!existing) {
    throw new Error(`Company with id "${payload.id}" was not found`)
  }

  const updated: Company = { ...existing, ...payload }
  companies = companies.map((company) => (company.id === payload.id ? updated : company))
  return delay(updated)
}

export async function deleteCompany(id: string): Promise<{ id: string }> {
  companies = companies.filter((company) => company.id !== id)
  return delay({ id })
}
