import BankContent from "../../components/BankContent"
import { useBanks } from "../../hooks/bank/useBanks"

export default function BanksPage() {
  const banks = useBanks()

  return <BankContent {...banks} />
}
