import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import TableActionsHeader from "../../../../components/shared/TableActionsHeader"
import { SharedFormDialog } from "../../../../components/shared/dialog/SharedFormDialog"
import AdminsTable from "./AdminsTable"
import AdminSkeleton from "./AdminSkeleton"
import AdminError from "./AdminError"
import AdminEmpty from "./AdminEmpty"
import { useDeleteAdmin } from "../hooks/useDeleteAdmin"
import { filterAdmins, isAdminsEmpty } from "../utils/admin.utils"
import { ADMIN_FORM_FIELDS } from "../constants/admin.form"
import { createAdminSchema, type CreateAdminFormValues } from "../schemas/admin.schema"
import type { AdminUser } from "../types/admin.types"
import type { UseAdminsResult } from "../hooks/useAdmins"

type AdminDialogState =
  | { mode: "create" }
  | { mode: "edit"; admin: AdminUser }

export default function AdminContent({ data, isLoading, isError, error, refetch }: UseAdminsResult) {
  const [search, setSearch] = useState("")
  const [dialogState, setDialogState] = useState<AdminDialogState | null>(null)
  const deleteAdmin = useDeleteAdmin()
  const navigate = useNavigate()

  if (isLoading) return <AdminSkeleton />
  if (isError) return <AdminError message={error?.message} onRetry={refetch} />
  if (!data || isAdminsEmpty(data)) return <AdminEmpty />

  const filteredAdmins = filterAdmins(data, search)

  const handleAddAdmin = () => {
    setDialogState({ mode: "create" })
  }

  const handleEdit = (user: AdminUser) => {
    setDialogState({ mode: "edit", admin: user })
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this admin?")) {
      deleteAdmin.mutate(id)
    }
  }

  const handleRowClick = (id: string) => {
    navigate(`/admin/platform-management/admin/${id}`)
  }

  const handleDialogSubmit = (values: CreateAdminFormValues) => {
    if (dialogState?.mode === "edit") {
      console.log("Update admin:", { id: dialogState.admin.id, ...values })
    } else {
      console.log("Create admin:", values)
    }
    setDialogState(null)
  }

  const dialogDefaultValues: CreateAdminFormValues =
    dialogState?.mode === "edit"
      ? {
          name: dialogState.admin.name,
          email: dialogState.admin.email,
          role: dialogState.admin.role,
          status: dialogState.admin.status,
        }
      : { name: "", email: "", role: "Admin", status: "ACTIVE" }

  return (
    <>
      <TableActionsHeader
        searchTerm={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search admins..."
        actionButtonText="Add Admin"
        onActionClick={handleAddAdmin}
        onFilterClick={() => console.log("Filter Admins clicked")}
      />
      <AdminsTable
        data={filteredAdmins}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onRowClick={handleRowClick}
      />

      <SharedFormDialog<CreateAdminFormValues>
        open={dialogState !== null}
        onOpenChange={(open) => !open && setDialogState(null)}
        title={dialogState?.mode === "edit" ? "Edit Admin" : "Add New Admin"}
        fields={ADMIN_FORM_FIELDS}
        defaultValues={dialogDefaultValues}
        resolver={zodResolver(createAdminSchema)}
        onSubmit={handleDialogSubmit}
        submitText={dialogState?.mode === "edit" ? "Save Changes" : "Add Admin"}
      />
    </>
  )
}
