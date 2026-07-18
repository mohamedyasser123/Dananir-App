import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import TableActionsHeader from "@/components/shared/TableActionsHeader"
import SharedTable from "@/components/shared/SharedTable"
import { SharedFormDialog } from "@/components/shared/dialog/SharedFormDialog"
import BankStatsCards from "./bankscomponent/BankStatsCards"
import BankListSkeleton from "./bankscomponent/BankListSkeleton"
import BankListError from "./bankscomponent/BankListError"
import BankListEmpty from "./bankscomponent/BankListEmpty"
import { useCreateBank } from "../hooks/bank/useCreateBank"
import { useUpdateBank } from "../hooks/bank/useUpdateBank"
import { useDeleteBank } from "../hooks/bank/useDeleteBank"
import { filterBanks, isBanksEmpty } from "../utils/bank.utils"
import { BANK_FORM_TABS } from "../constants/bank.form"
import { createBankSchema, type CreateBankFormValues } from "../schemas/bank.schema"
import type { Bank } from "../types/bank.types"
import type { UseBanksResult } from "../hooks/bank/useBanks"

type BankDialogState =
  | { mode: "create" }
  | { mode: "edit"; bank: Bank }

const BANK_DIALOG_DEFAULT_VALUES: CreateBankFormValues = {
  bankName: "",
  email: "",
}

export default function BankContent({ data, isLoading, isError, error, refetch }: UseBanksResult) {
  const [search, setSearch] = useState("")
  const [dialogState, setDialogState] = useState<BankDialogState | null>(null)
  const createBank = useCreateBank()
  const updateBank = useUpdateBank()
  const deleteBank = useDeleteBank()

  if (isLoading) return <BankListSkeleton />
  if (isError) return <BankListError message={error?.message} onRetry={refetch} />
  if (!data || isBanksEmpty(data)) return <BankListEmpty />

  const filteredBanks = filterBanks(data, search)

  const columns = [
    { header: "Bank Name", accessorKey: "bankName" },
    { header: "City", accessorKey: "city" },
    { header: "Number of Branch", accessorKey: "branchesCount" },
    { header: "Number of Transactions", accessorKey: "transactionsCount" },
    { header: "Actions", accessorKey: "actions" },
  ]

  const handleAddBank = () => {
    setDialogState({ mode: "create" })
  }

  const handleEdit = (bank: Bank) => {
    setDialogState({ mode: "edit", bank })
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this bank?")) {
      deleteBank.mutate(id)
    }
  }

  const handleDialogSubmit = (values: CreateBankFormValues) => {
    if (dialogState?.mode === "edit") {
      updateBank.mutate({ id: dialogState.bank.id, ...values })
    } else {
      createBank.mutate(values)
    }
    setDialogState(null)
  }

  const dialogDefaultValues: CreateBankFormValues =
    dialogState?.mode === "edit" ? { ...BANK_DIALOG_DEFAULT_VALUES, ...dialogState.bank } : BANK_DIALOG_DEFAULT_VALUES

  return (
    <>
      <TableActionsHeader
        searchTerm={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search admins..."
        actionButtonText="Add Bank"
        onActionClick={handleAddBank}
        onFilterClick={() => console.log("Filter Admins clicked")}
      />
      <BankStatsCards />
      <SharedTable
        showFilters={false}
        data={filteredBanks}
        columns={columns}
        actionVariant="ghost"
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={(bank) => console.log("View bank", bank)}
      />

      <SharedFormDialog<CreateBankFormValues>
        open={dialogState !== null}
        onOpenChange={(open) => !open && setDialogState(null)}
        title={dialogState?.mode === "edit" ? "Edit Bank" : "Add New Bank"}
        tabs={BANK_FORM_TABS}
        defaultValues={dialogDefaultValues}
        resolver={zodResolver(createBankSchema)}
        onSubmit={handleDialogSubmit}
        loading={createBank.isPending || updateBank.isPending}
        submitText={dialogState?.mode === "edit" ? "Save Changes" : "Save"}
      />
    </>
  )
}
