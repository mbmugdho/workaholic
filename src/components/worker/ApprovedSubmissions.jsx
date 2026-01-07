import { useQuery } from '@tanstack/react-query'
import { fetchWorkerApprovedSubmissions } from '../../services/submissionService'
import Loading from '../common/Loading'
import EmptyState from '../common/EmptyState'
import Table from '../common/Table'

export default function ApprovedSubmissions() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['worker-approved-submissions'],
    queryFn: fetchWorkerApprovedSubmissions,
  })

  if (isLoading) return <Loading label="Loading approved submissions..." />

  if (isError) {
    return (
      <EmptyState
        title="Could not load approved submissions"
        message="Please try again later."
      />
    )
  }

  const submissions = data?.submissions || []

  if (submissions.length === 0) {
    return (
      <EmptyState
        title="No approved submissions yet"
        message="Once buyers approve your work, it will appear here."
      />
    )
  }

  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold">Approved Submissions</h3>
      <p className="text-sm text-base-content/70 mt-1">
        Your approved work and earnings.
      </p>

      <div className="mt-4">
        <Table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Buyer</th>
              <th>Payable</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((s) => (
              <tr key={s._id}>
                <td className="max-w-[340px]">
                  <div className="font-medium">{s.taskTitle}</div>
                </td>
                <td className="text-sm">{s.buyerName}</td>
                <td>
                  <span className="badge badge-primary badge-outline">
                    {s.payableAmount} coins
                  </span>
                </td>
                <td>
                  <span className="badge badge-success capitalize">
                    {s.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  )
}
