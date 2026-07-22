import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import TableActionsHeader from "@/components/shared/TableActionsHeader"
import SharedTable from "@/components/shared/SharedTable"
import { SharedFormDialog } from "@/components/shared/dialog/SharedFormDialog"
import BankStatsCards from "./bankscomponent/BankStatsCards"
import CompaniesByCategoryChart from "./companycomponent/CompaniesByCategoryChart"
import CompanySkeleton from "./companycomponent/CompanySkeleton"
import CompanyError from "./companycomponent/CompanyError"
import CompanyEmpty from "./companycomponent/CompanyEmpty"
import { useDeleteCompany } from "../hooks/company/useDeleteCompany"
import { useCreateCompany } from "../hooks/company/useCreateCompany"
import { useUpdateCompany } from "../hooks/company/useUpdateCompany"
import { filterCompanies, isCompaniesEmpty } from "../utils/company.utils"
import { COMPANY_FORM_TABS } from "../constants/company.form"
import { createCompanySchema, type CreateCompanyFormValues } from "../schemas/company.schema"
import type { Company, CompanyStatus } from "../types/company.types"
import type { UseCompaniesResult } from "../hooks/company/useCompanies"

type CompanyDialogState =
  | { mode: "create" }
  | { mode: "edit"; company: Company }

const STATUS_FILTER_OPTIONS = [
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
]

const COMPANY_DIALOG_DEFAULT_VALUES: CreateCompanyFormValues = {
  companyName: "",
  email: "",
}

export default function CompanyContent({ data, isLoading, isError, error, refetch }: UseCompaniesResult) {
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState<string | undefined>(undefined)
  const [dialogState, setDialogState] = useState<CompanyDialogState | null>(null)
  const createCompany = useCreateCompany()
  const updateCompany = useUpdateCompany()
  const deleteCompany = useDeleteCompany()
  const navigate = useNavigate()

  if (isLoading) return <CompanySkeleton />
  if (isError) return <CompanyError message={error?.message} onRetry={refetch} />
  if (!data || isCompaniesEmpty(data)) return <CompanyEmpty />

  const filteredCompanies = filterCompanies(data, search, status as CompanyStatus | undefined)

  const columns = [
    { header: "Company Name", accessorKey: "companyName" },
    { header: "Email", accessorKey: "email" },
    { header: "City", accessorKey: "city" },
    { header: "Status", accessorKey: "status" },
    { header: "Actions", accessorKey: "actions" },
  ]

  const handleAddCompany = () => {
    setDialogState({ mode: "create" })
  }

  const handleEdit = (company: Company) => {
    setDialogState({ mode: "edit", company })
  }

  const handleView = (company: Company) => {
    navigate(`/admin/user-segment/company/${company.id}`)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this company?")) {
      deleteCompany.mutate(id)
    }
  }

  const handleDialogSubmit = (values: CreateCompanyFormValues) => {
    if (dialogState?.mode === "edit") {
      updateCompany.mutate({ id: dialogState.company.id, ...values })
    } else {
      createCompany.mutate(values)
    }
    setDialogState(null)
  }

  const dialogDefaultValues: CreateCompanyFormValues =
    dialogState?.mode === "edit" ? { ...COMPANY_DIALOG_DEFAULT_VALUES, ...dialogState.company } : COMPANY_DIALOG_DEFAULT_VALUES

  return (
    <>
      <TableActionsHeader
        title="Companies Management"
        subtitle="Manage and monitor all registered companies"
        searchTerm={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search companies..."
        filterOptions={STATUS_FILTER_OPTIONS}
        filterValue={status}
        onFilterChange={setStatus}
        filterPlaceholder="Status"
        actionButtonText="Add Company"
        onActionClick={handleAddCompany}
      />

      <BankStatsCards />
      <CompaniesByCategoryChart />

      <SharedTable
        data={filteredCompanies}
        columns={columns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <SharedFormDialog<CreateCompanyFormValues>
        open={dialogState !== null}
        onOpenChange={(open) => !open && setDialogState(null)}
        title={dialogState?.mode === "edit" ? "Edit Company" : "Add New Company"}
        tabs={COMPANY_FORM_TABS}
        defaultValues={dialogDefaultValues}
        resolver={zodResolver(createCompanySchema)}
        onSubmit={handleDialogSubmit}
        loading={createCompany.isPending || updateCompany.isPending}
        submitText={dialogState?.mode === "edit" ? "Save Changes" : "Save"}
      />
    </>
  )
}
