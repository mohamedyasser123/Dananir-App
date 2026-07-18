import type { Bank, BankStatus } from "../types/bank.types"

export function filterBanks(banks: Bank[], search: string, status?: BankStatus): Bank[] {
  const term = search.trim().toLowerCase()

  return banks
    .filter((bank) => !status || bank.status === status)
    .filter(
      (bank) =>
        !term ||
        bank.bankName.toLowerCase().includes(term) ||
        bank.email.toLowerCase().includes(term)
    )
}

export function isBanksEmpty(banks: Bank[]): boolean {
  return banks.length === 0
}
