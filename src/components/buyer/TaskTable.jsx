import Table from '../common/Table'

export default function TaskTable({ tasks, onEdit, onDelete, deletingId }) {
  return (
    <Table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Deadline</th>
          <th>Payable</th>
          <th>Remaining Workers</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((t) => (
          <tr key={t._id}>
            <td className="max-w-[320px]">
              <div className="font-medium">{t.taskTitle}</div>
              <div className="text-xs text-base-content/70 line-clamp-1">
                {t.taskDetail}
              </div>
            </td>
            <td className="text-sm">
              {new Date(t.completionDate).toLocaleDateString()}
            </td>
            <td>
              <span className="badge badge-primary badge-outline">
                {t.payableAmount} coins
              </span>
            </td>
            <td>
              <span className="badge badge-ghost">{t.requiredWorkers}</span>
            </td>
            <td className="space-x-2">
              <button
                className="btn btn-sm btn-outline"
                type="button"
                onClick={() => onEdit(t)}
              >
                Update
              </button>
              <button
                className="btn btn-sm btn-error"
                type="button"
                disabled={deletingId === t._id}
                onClick={() => onDelete(t._id)}
              >
                {deletingId === t._id ? 'Deleting...' : 'Delete'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
