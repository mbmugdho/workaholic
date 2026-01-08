import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import Table from '../common/Table'
import UserAvatar from '../common/UserAvatar'
import RoleDropdown from './RoleDropdown'
import { deleteUser, updateUserRole } from '../../services/adminService'

export default function UsersTable({ users }) {
  const qc = useQueryClient()

  const roleMut = useMutation({
    mutationFn: ({ id, role }) => updateUserRole(id, role),
    onSuccess: () => {
      toast.success('Role updated')
      qc.invalidateQueries({ queryKey: ['admin-users'] })
      qc.invalidateQueries({ queryKey: ['admin-summary'] })
    },
    onError: (err) =>
      toast.error(err?.response?.data?.message || 'Role update failed'),
  })

  const deleteMut = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success('User removed')
      qc.invalidateQueries({ queryKey: ['admin-users'] })
      qc.invalidateQueries({ queryKey: ['admin-summary'] })
    },
    onError: (err) =>
      toast.error(err?.response?.data?.message || 'Remove failed'),
  })

  return (
    <Table>
      <thead>
        <tr>
          <th>User</th>
          <th>Role</th>
          <th>Coins</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {users.map((u) => (
          <tr key={u._id}>
            <td>
              <div className="flex items-center gap-3">
                <UserAvatar
                  photoURL={u.photoURL}
                  displayName={u.displayName}
                  email={u.email}
                  size={40}
                />
                <div>
                  <div className="font-medium">{u.displayName}</div>
                  <div className="text-xs text-base-content/70">{u.email}</div>
                </div>
              </div>
            </td>

            <td className="capitalize">
              <RoleDropdown
                value={u.role}
                disabled={roleMut.isPending}
                onChange={(role) => roleMut.mutate({ id: u._id, role })}
              />
            </td>

            <td>
              <span className="badge badge-primary badge-outline">
                {u.coins} coins
              </span>
            </td>

            <td>
              <button
                type="button"
                className="btn btn-sm btn-error"
                disabled={deleteMut.isPending}
                onClick={() => deleteMut.mutate(u._id)}
              >
                {deleteMut.isPending ? 'Removing...' : 'Remove'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
