import { useQuery } from '@tanstack/react-query'
import { fetchBuyerSummary } from '../../../services/userService'
import Loading from '../../../components/common/Loading'
import StatsCard from '../../../components/dashboard/StatsCard'
import SubmissionReview from '../../../components/buyer/SubmissionReview'

export default function BuyerHome() {
  const { data, isLoading } = useQuery({
    queryKey: ['buyer-summary'],
    queryFn: fetchBuyerSummary,
  })

  const summary = data?.summary

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Buyer Dashboard</h1>
        <p className="text-sm text-base-content/70 mt-1">
          Track tasks, pending worker slots, and your payment activity.
        </p>
      </div>

      {isLoading ? (
        <Loading label="Loading buyer stats..." />
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          <StatsCard label="Total Tasks" value={summary?.totalTasks ?? 0} />
          <StatsCard label="Pending Slots" value={summary?.pendingSlots ?? 0} />
          <StatsCard
            label="Total Paid"
            value={`$${summary?.totalPaid?.toFixed?.(2) ?? '0.00'}`}
          />
        </div>
      )}

      <SubmissionReview />
    </div>
  )
}
