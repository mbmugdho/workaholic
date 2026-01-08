import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import Table from '../common/Table'
import { deleteTaskAdmin } from '../../services/adminService'

export default function TasksTable({ tasks }) {
  const qc = useQueryClient()

  const delMut = useMutation({
    mutationFn: deleteTaskAdmin,
    onSuccess: () => {
      toast.success('Task deleted')
      qc.invalidateQueries({ queryKey: ['admin-tasks'] })
    },
    onError: (err) =>
      toast.error(err?.response?.data?.message || 'Delete failed'),
  })

  return (
    <Table>
      <thead>
        <tr>
          <th>Task</th>
          <th>Buyer</th>
          <th>Payable</th>
          <th>Slots Left</th>
          <th>Deadline</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {tasks.map((t) => (
          <tr key={t._id}>
            <td className="max-w-[360px]">
              <div className="font-medium">{t.taskTitle}</div>
              <div className="text-xs text-base-content/70 line-clamp-1">
                {t.taskDetail}
              </div>
            </td>
            <td>
              <div className="font-medium">{t.buyerName}</div>
              <div className="text-xs text-base-content/70">{t.buyerEmail}</div>
            </td>
            <td>
              <span className="badge badge-primary badge-outline">
                {t.payableAmount} coins
              </span>
            </td>
            <td>
              <span className="badge badge-ghost">{t.requiredWorkers}</span>
            </td>
            <td className="text-sm">
              {new Date(t.completionDate).toLocaleDateString()}
            </td>
            <td>
              <button
                type="button"
                className="btn btn-sm btn-error"
                disabled={delMut.isPending}
                onClick={() => delMut.mutate(t._id)}
              >
                {delMut.isPending ? 'Deleting...' : 'Delete'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
