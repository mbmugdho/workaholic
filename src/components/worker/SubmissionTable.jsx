import Table from '../common/Table'

function StatusBadge({ status }) {
  const cls =
    status === 'approved'
      ? 'badge-success'
      : status === 'rejected'
      ? 'badge-error'
      : 'badge-warning'

  return <span className={`badge ${cls} capitalize`}>{status}</span>
}

export default function SubmissionTable({ submissions }) {
  return (
    <Table>
      <thead>
        <tr>
          <th>Task</th>
          <th>Buyer</th>
          <th>Payable</th>
          <th>Status</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {submissions.map((s) => (
          <tr key={s._id}>
            <td className="max-w-[320px]">
              <div className="font-medium">{s.taskTitle}</div>
              <div className="text-xs text-base-content/70">{s.buyerName}</div>
            </td>
            <td className="text-sm">{s.buyerEmail}</td>
            <td>
              <span className="badge badge-primary badge-outline">
                {s.payableAmount} coins
              </span>
            </td>
            <td>
              <StatusBadge status={s.status} />
            </td>
            <td className="text-sm">
              {new Date(s.createdAt).toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
