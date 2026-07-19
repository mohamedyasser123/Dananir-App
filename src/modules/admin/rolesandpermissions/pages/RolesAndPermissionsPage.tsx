import TableActionsHeader from '@/components/shared/TableActionsHeader'
import { useRef } from 'react'
import RoleCards from '../components/RoleCards';
import PermissionMatrix from '../components/PermissionMatrix';
import RolesSkeleton from '../components/RolesSkeleton';
import RolesError from '../components/RolesError';
import RolesEmpty from '../components/RolesEmpty';
import { useRoles } from '../hooks/role/useRoles';
import { isRolesEmpty } from '../utils/role.utils';

export default function RolesAndPermissionsPage() {
  const { data, isLoading, isError, error, refetch } = useRoles()
  const createRoleSectionRef = useRef<HTMLDivElement>(null)

  const handleCreateRole = () => {
    createRoleSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <>
      <TableActionsHeader
        showFilter={false}
        title="Roles & Permissions"
        subtitle="Manage roles and their permissions"
        actionButtonText="create Role"
        onActionClick={handleCreateRole}
      />

      {isLoading ? (
        <RolesSkeleton />
      ) : isError ? (
        <RolesError message={error?.message} onRetry={refetch} />
      ) : !data || isRolesEmpty(data) ? (
        <RolesEmpty />
      ) : (
        <RoleCards roles={data} />
      )}

      <div ref={createRoleSectionRef}>
        <PermissionMatrix />
      </div>
    </>
  )
}
