import BankContent from "../../component/BankContent"
import { useBanks } from "../../hooks/bank/useBanks"

export default function BanksPage() {
  const banks = useBanks()

  return <BankContent {...banks} />
}
