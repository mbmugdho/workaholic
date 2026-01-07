import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'

import { fetchMyPayments } from '../../../services/paymentService'
import Loading from '../../../components/common/Loading'
import EmptyState from '../../../components/common/EmptyState'
import Table from '../../../components/common/Table'

export default function PaymentHistory() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['buyer-payments'],
    queryFn: fetchMyPayments,
  })

  if (isLoading) return <Loading label="Loading payment history..." />

  if (isError) {
    return (
      <EmptyState
        title="Could not load payment history"
        message="Please try again later."
      />
    )
  }

  const payments = data?.payments || []

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold">Payment History</h1>
        <p className="text-sm text-base-content/70 mt-1">
          All coin purchases made from your buyer account.
        </p>
      </div>

      {payments.length === 0 ? (
        <EmptyState
          title="No payments yet"
          message="Purchase coins to see payment history here."
        />
      ) : (
        <Table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Coins</th>
              <th>Amount</th>
              <th>Provider</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p._id}>
                <td className="text-sm">
                  {p.paidAt
                    ? format(new Date(p.paidAt), 'PPp')
                    : format(new Date(p.createdAt), 'PPp')}
                </td>
                <td>
                  <span className="badge badge-primary badge-outline">
                    {p.coins} coins
                  </span>
                </td>
                <td className="font-medium">
                  ${Number(p.amountUSD).toFixed(2)}
                </td>
                <td className="capitalize">{p.provider || 'dummy'}</td>
                <td>
                  <span
                    className={`badge ${
                      p.status === 'success' ? 'badge-success' : 'badge-error'
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  )
}
