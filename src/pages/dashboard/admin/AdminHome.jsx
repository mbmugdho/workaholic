import { useQuery } from '@tanstack/react-query'
import Loading from '../../../components/common/Loading'
import StatsCard from '../../../components/dashboard/StatsCard'
import { fetchAdminSummary } from '../../../services/adminService'

export default function AdminHome() {
  const { data, isLoading } = useQuery({
    queryKey: ['admin-summary'],
    queryFn: fetchAdminSummary,
  })

  const summary = data?.summary

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-sm text-base-content/70 mt-1">
          Monitor users, coins, payments, tasks, and withdrawals.
        </p>
      </div>

      {isLoading ? (
        <Loading label="Loading admin stats..." />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard label="Total Workers" value={summary?.totalWorkers ?? 0} />
          <StatsCard label="Total Buyers" value={summary?.totalBuyers ?? 0} />
          <StatsCard
            label="Total Available Coins"
            value={summary?.totalAvailableCoins ?? 0}
          />
          <StatsCard
            label="Total Payments"
            value={`$${Number(summary?.totalPayments ?? 0).toFixed(2)}`}
          />
        </div>
      )}
    </div>
  )
}
