import TableActionsHeader from '@/components/shared/TableActionsHeader'
import React, { useState } from 'react'
import RoleCards from '../components/RoleCards';
import PermissionMatrix from '../components/PermissionMatrix';
type RoleDialogState =
  | { mode: "create" }
  | { mode: "edit"; }
export default function RolesAndPermissionsPage() {
      const [dialogState, setDialogState] = useState<RoleDialogState | null>(null)
    
    const handleAddAdmin = () => {
    setDialogState({ mode: "create" })
  }
  
  return (
    <>
      <TableActionsHeader
      showFilter={false}
            title="Roles & Permissions"
            subtitle="Manage roles and their permissions"
            actionButtonText="create Role"
            onActionClick={handleAddAdmin}
          />
          <RoleCards/>
          <PermissionMatrix/>
    </>
  )
}
