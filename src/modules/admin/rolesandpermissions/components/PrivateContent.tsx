import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import TableActionsHeader from "@/components/shared/TableActionsHeader"
import SharedTable from "@/components/shared/SharedTable"
import { SharedFormDialog } from "@/components/shared/dialog/SharedFormDialog"
import BankStatsCards from "./bankscomponent/BankStatsCards"
import PrivateListSkeleton from "./privatecomponent/PrivateListSkeleton"
import PrivateListError from "./privatecomponent/PrivateListError"
import PrivateListEmpty from "./privatecomponent/PrivateListEmpty"
import { useCreatePrivateUser } from "../hooks/private/useCreatePrivateUser"
import { useUpdatePrivateUser } from "../hooks/private/useUpdatePrivateUser"
import { useDeletePrivateUser } from "../hooks/private/useDeletePrivateUser"
import { filterPrivateUsers, isPrivateUsersEmpty } from "../utils/private.utils"
import { PRIVATE_USER_FORM_FIELDS } from "../constants/private.form"
import { createPrivateUserSchema, type CreatePrivateUserFormValues } from "../schemas/private.schema"
import type { PrivateUser, PrivateUserStatus } from "../types/private.types"
import type { UsePrivateUsersResult } from "../hooks/private/usePrivateUsers"

type PrivateUserDialogState =
  | { mode: "create" }
  | { mode: "edit"; user: PrivateUser }

const STATUS_FILTER_OPTIONS = [
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
]

const PRIVATE_USER_DIALOG_DEFAULT_VALUES: CreatePrivateUserFormValues = {
  name: "",
  email: "",
  status: "Active",
}

export default function PrivateContent({ data, isLoading, isError, error, refetch }: UsePrivateUsersResult) {
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState<string | undefined>(undefined)
  const [dialogState, setDialogState] = useState<PrivateUserDialogState | null>(null)
  const createPrivateUser = useCreatePrivateUser()
  const updatePrivateUser = useUpdatePrivateUser()
  const deletePrivateUser = useDeletePrivateUser()

  if (isLoading) return <PrivateListSkeleton />
  if (isError) return <PrivateListError message={error?.message} onRetry={refetch} />
  if (!data || isPrivateUsersEmpty(data)) return <PrivateListEmpty />

  const filteredUsers = filterPrivateUsers(data, search, status as PrivateUserStatus | undefined)

  const columns = [
    { header: "Name", accessorKey: "name" },
    { header: "Email", accessorKey: "email" },
    { header: "Phone Number", accessorKey: "phoneNumber" },
    { header: "Status", accessorKey: "status" },
    { header: "Actions", accessorKey: "actions" },
  ]

  const handleAddUser = () => {
    setDialogState({ mode: "create" })
  }

  const handleEdit = (user: PrivateUser) => {
    setDialogState({ mode: "edit", user })
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      deletePrivateUser.mutate(id)
    }
  }

  const handleDialogSubmit = (values: CreatePrivateUserFormValues) => {
    if (dialogState?.mode === "edit") {
      updatePrivateUser.mutate({ id: dialogState.user.id, ...values })
    } else {
      createPrivateUser.mutate(values)
    }
    setDialogState(null)
  }

  const dialogDefaultValues: CreatePrivateUserFormValues =
    dialogState?.mode === "edit"
      ? { ...PRIVATE_USER_DIALOG_DEFAULT_VALUES, ...dialogState.user }
      : PRIVATE_USER_DIALOG_DEFAULT_VALUES

  return (
    <>
      <BankStatsCards />

      <TableActionsHeader
        title="Private Users"
        subtitle="Manage and monitor private user accounts"
        searchTerm={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search users..."
        filterOptions={STATUS_FILTER_OPTIONS}
        filterValue={status}
        onFilterChange={setStatus}
        filterPlaceholder="Status"
        actionButtonText="Add User"
        onActionClick={handleAddUser}
      />
      <SharedTable
        data={filteredUsers}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={(user) => console.log("View user", user)}
      />

      <SharedFormDialog<CreatePrivateUserFormValues>
        open={dialogState !== null}
        onOpenChange={(open) => !open && setDialogState(null)}
        title={dialogState?.mode === "edit" ? "Edit User" : "Add New User"}
        fields={PRIVATE_USER_FORM_FIELDS}
        defaultValues={dialogDefaultValues}
        resolver={zodResolver(createPrivateUserSchema)}
        onSubmit={handleDialogSubmit}
        loading={createPrivateUser.isPending || updatePrivateUser.isPending}
        submitText={dialogState?.mode === "edit" ? "Save Changes" : "Save"}
      />
    </>
  )
}
