import { useState } from "react"
import TableActionsHeader from "../../../../components/shared/TableActionsHeader"
import AdminsTable from "./AdminsTable"
import AdminSkeleton from "./AdminSkeleton"
import AdminError from "./AdminError"
import AdminEmpty from "./AdminEmpty"
import { useDeleteAdmin } from "../hooks/useDeleteAdmin"
import { filterAdmins, isAdminsEmpty } from "../utils/admin.utils"
import type { AdminUser } from "../types/admin.types"
import type { UseAdminsResult } from "../hooks/useAdmins"

export default function AdminContent({ data, isLoading, isError, error, refetch }: UseAdminsResult) {
  const [search, setSearch] = useState("")
  const deleteAdmin = useDeleteAdmin()

  if (isLoading) return <AdminSkeleton />
  if (isError) return <AdminError message={error?.message} onRetry={refetch} />
  if (!data || isAdminsEmpty(data)) return <AdminEmpty />

  const filteredAdmins = filterAdmins(data, search)

  const handleAddAdmin = () => {
    console.log("Open Add Admin Modal!")
  }

  const handleEdit = (user: AdminUser) => {
    console.log("Editing User: ", user)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this admin?")) {
      deleteAdmin.mutate(id)
    }
  }

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
      />
    </>
  )
}
