import { useQuery } from '@tanstack/react-query'
import Loading from '../../../components/common/Loading'
import EmptyState from '../../../components/common/EmptyState'
import UsersTable from '../../../components/admin/UsersTable'
import { fetchAllUsers } from '../../../services/adminService'

export default function ManageUsers() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['admin-users'],
    queryFn: fetchAllUsers,
  })

  if (isLoading) return <Loading label="Loading users..." />

  if (isError) {
    return (
      <EmptyState
        title="Could not load users"
        message="Please try again later."
      />
    )
  }

  const users = data?.users || []

  if (users.length === 0) {
    return (
      <EmptyState
        title="No users found"
        message="Users will appear here after registration."
      />
    )
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold">Manage Users</h1>
        <p className="text-sm text-base-content/70 mt-1">
          Update roles or remove users from the platform.
        </p>
      </div>

      <UsersTable users={users} />
    </div>
  )
}
