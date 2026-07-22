export type BankStatus = "Active" | "Inactive"

export interface Bank {
  id: string
  bankName: string
  email: string
  phoneNumber?: string
  website?: string
  tradeNumber?: string
  secondWebsite?: string
  loanOffer?: string
  loanType?: string
  headOfficeAddress?: string
  country?: string
  state?: string
  city?: string
  zipcode?: string
  facebook?: string
  instagram?: string
  tiktok?: string
  youtube?: string
  whatsapp?: string
  visibility?: string[]
  status: BankStatus
  branchesCount: number
  transactionsCount: number
}

export interface BankDetails extends Bank {
  createdAt: string
  lastActivityAt: string | null
}
