import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import useAuth from '../../../hooks/useAuth'
import WithdrawalForm from '../../../components/worker/WithdrawalForm'
import {
  createWithdrawal,
  fetchMyWithdrawals,
} from '../../../services/withdrawalService'
import Loading from '../../../components/common/Loading'
import EmptyState from '../../../components/common/EmptyState'
import Table from '../../../components/common/Table'

export default function Withdrawals() {
  const { user, refreshUser } = useAuth()
  const qc = useQueryClient()

  const coins = user?.coins ?? 0

  const { data, isLoading } = useQuery({
    queryKey: ['worker-withdrawals'],
    queryFn: fetchMyWithdrawals,
  })

  const withdrawals = data?.withdrawals || []

  const mut = useMutation({
    mutationFn: createWithdrawal,
    onSuccess: async () => {
      toast.success('Withdrawal request submitted')
      qc.invalidateQueries({ queryKey: ['worker-withdrawals'] })
      await refreshUser?.()
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || 'Withdrawal request failed')
    },
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Withdrawals</h1>
        <p className="text-sm text-base-content/70 mt-1">
          Request withdrawals when eligible and track your requests.
        </p>
      </div>

      <WithdrawalForm
        availableCoins={coins}
        submitting={mut.isPending}
        onSubmit={(payload) => mut.mutate(payload)}
      />

      <div className="mt-2">
        <h3 className="text-xl font-bold">Withdrawal History</h3>
        <p className="text-sm text-base-content/70 mt-1">
          Your submitted withdrawal requests.
        </p>

        {isLoading ? (
          <Loading label="Loading withdrawals..." />
        ) : withdrawals.length === 0 ? (
          <EmptyState
            title="No withdrawal requests yet"
            message="Once you request a withdrawal, it will appear here."
          />
        ) : (
          <div className="mt-4">
            <Table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Coins</th>
                  <th>USD</th>
                  <th>Method</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {withdrawals.map((w) => (
                  <tr key={w._id}>
                    <td className="text-sm">
                      {new Date(w.createdAt).toLocaleString()}
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
                    <td>
                      <span
                        className={`badge ${
                          w.status === 'approved'
                            ? 'badge-success'
                            : 'badge-warning'
                        } capitalize`}
                      >
                        {w.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </div>
    </div>
  )
}
