import type { Bank, BankDetails } from "../types/bank.types"
import type { CreateBankFormValues, UpdateBankFormValues } from "../schemas/bank.schema"

const NETWORK_DELAY_MS = 600

function delay<T>(data: T, ms = NETWORK_DELAY_MS): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms))
}

let banks: Bank[] = [
  { id: "1", bankName: "First National Bank", email: "contact@fnb.com", city: "USA", status: "Active", branchesCount: 1, transactionsCount: 1 },
  { id: "2", bankName: "Global Trust Bank", email: "contact@globaltrust.com", city: "UK", status: "Active", branchesCount: 2, transactionsCount: 1 },
  { id: "3", bankName: "Capital Finance Bank", email: "contact@capitalfinance.com", city: "USA", status: "Active", branchesCount: 2, transactionsCount: 1 },
  { id: "4", bankName: "Precision Ledger Bank", email: "contact@precisionledger.io", city: "UK", status: "Inactive", branchesCount: 890, transactionsCount: 12 },
]

const bankDetailsMeta: Record<string, { createdAt: string; lastActivityAt: string | null }> = {
  "1": { createdAt: "2023-01-10T09:00:00.000Z", lastActivityAt: "2026-07-15T08:30:00.000Z" },
  "2": { createdAt: "2023-03-22T11:15:00.000Z", lastActivityAt: "2026-07-16T14:05:00.000Z" },
  "3": { createdAt: "2023-05-02T13:40:00.000Z", lastActivityAt: "2026-07-14T09:12:00.000Z" },
  "4": { createdAt: "2023-06-18T08:20:00.000Z", lastActivityAt: null },
}

function generateId(): string {
  const maxId = banks.reduce((max, bank) => Math.max(max, Number(bank.id) || 0), 0)
  return (maxId + 1).toString()
}

export async function getBanks(): Promise<Bank[]> {
  return delay([...banks])
}

export async function getBankById(id: string): Promise<BankDetails> {
  const bank = banks.find((item) => item.id === id)
  if (!bank) {
    throw new Error(`Bank with id "${id}" was not found`)
  }

  const meta = bankDetailsMeta[id] ?? { createdAt: new Date().toISOString(), lastActivityAt: null }

  return delay({
    ...bank,
    createdAt: meta.createdAt,
    lastActivityAt: meta.lastActivityAt,
  })
}

export async function createBank(payload: CreateBankFormValues): Promise<Bank> {
  const newBank: Bank = {
    id: generateId(),
    status: "Active",
    branchesCount: 0,
    transactionsCount: 0,
    ...payload,
  }
  banks = [...banks, newBank]
  return delay(newBank)
}

export async function updateBank(payload: UpdateBankFormValues): Promise<Bank> {
  const existing = banks.find((bank) => bank.id === payload.id)
  if (!existing) {
    throw new Error(`Bank with id "${payload.id}" was not found`)
  }

  const updated: Bank = { ...existing, ...payload }
  banks = banks.map((bank) => (bank.id === payload.id ? updated : bank))
  return delay(updated)
}

export async function deleteBank(id: string): Promise<{ id: string }> {
  banks = banks.filter((bank) => bank.id !== id)
  return delay({ id })
}
