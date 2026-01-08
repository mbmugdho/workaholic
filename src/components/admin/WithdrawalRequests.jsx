import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import Loading from '../common/Loading'
import EmptyState from '../common/EmptyState'
import Table from '../common/Table'
import {
  approveWithdrawal,
  fetchPendingWithdrawals,
} from '../../services/adminService'

export default function WithdrawalRequests() {
  const qc = useQueryClient()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['admin-withdrawals-pending'],
    queryFn: fetchPendingWithdrawals,
  })

  const mut = useMutation({
    mutationFn: approveWithdrawal,
    onSuccess: () => {
      toast.success('Withdrawal approved')
      qc.invalidateQueries({ queryKey: ['admin-withdrawals-pending'] })
      qc.invalidateQueries({ queryKey: ['admin-summary'] })
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || 'Approval failed')
    },
  })

  if (isLoading) return <Loading label="Loading withdrawal requests..." />

  if (isError) {
    return (
      <EmptyState
        title="Could not load withdrawals"
        message="Please try again later."
      />
    )
  }

  const withdrawals = data?.withdrawals || []

  if (withdrawals.length === 0) {
    return (
      <EmptyState
        title="No pending withdrawals"
        message="Pending withdrawal requests will appear here."
      />
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold">Withdraw Requests</h2>
          <p className="text-sm text-base-content/70 mt-1">
            Approve pending withdrawals after processing payment externally.
          </p>
        </div>
        <div className="badge badge-outline">{withdrawals.length} pending</div>
      </div>

      <Table>
        <thead>
          <tr>
            <th>Worker</th>
            <th>Coins</th>
            <th>USD</th>
            <th>Method</th>
            <th>Account</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {withdrawals.map((w) => (
            <tr key={w._id}>
              <td>
                <div className="font-medium">{w.workerName}</div>
                <div className="text-xs text-base-content/70">
                  {w.workerEmail}
                </div>
              </td>
              <td>
                <span className="badge badge-primary badge-outline">
                  {w.withdrawalCoin} coins
                </span>
              </td>
              <td className="font-medium">
                ${Number(w.withdrawalAmountUSD).toFixed(2)}
              </td>
              <td className="capitalize">{w.paymentSystem}</td>
              <td className="text-sm">{w.accountNumber}</td>
              <td>
                <span className="badge badge-warning capitalize">
                  {w.status}
                </span>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-sm btn-success"
                  disabled={mut.isPending}
                  onClick={() => mut.mutate(w._id)}
                >
                  {mut.isPending ? 'Approving...' : 'Payment Success'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
