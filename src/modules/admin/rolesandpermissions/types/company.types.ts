import type { SharedVisibilityValue } from "@/components/shared/inputs/SharedVisibilityControl"

export type CompanyStatus = "Active" | "Inactive"

export interface Company {
  id: string
  companyName: string
  email: string
  phoneNumber?: string
  website?: string
  tradeNumber?: string
  managerName?: string
  industryBranch?: string
  address?: string
  country?: string
  state?: string
  city?: string
  zipcode?: string
  facebook?: string
  instagram?: string
  tiktok?: string
  youtube?: string
  whatsapp?: string
  visibility?: SharedVisibilityValue
  status: CompanyStatus
}

export interface CompanyDetails extends Company {
  createdAt: string
  lastActivityAt: string | null
}
