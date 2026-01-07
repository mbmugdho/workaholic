import { useQuery } from '@tanstack/react-query'
import { fetchWorkerSummary } from '../../../services/userService'
import Loading from '../../../components/common/Loading'
import StatsCard from '../../../components/dashboard/StatsCard'
import ApprovedSubmissions from '../../../components/worker/ApprovedSubmissions'

export default function WorkerHome() {
  const { data, isLoading } = useQuery({
    queryKey: ['worker-summary'],
    queryFn: fetchWorkerSummary,
  })

  const summary = data?.summary

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Worker Dashboard</h1>
        <p className="text-sm text-base-content/70 mt-1">
          Track your submissions, approvals, and total earnings.
        </p>
      </div>

      {isLoading ? (
        <Loading label="Loading worker stats..." />
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          <StatsCard
            label="Total Submissions"
            value={summary?.totalSubmissions ?? 0}
          />
          <StatsCard
            label="Pending Submissions"
            value={summary?.pendingSubmissions ?? 0}
          />
          <StatsCard
            label="Total Earning"
            value={`${summary?.totalEarning ?? 0} coins`}
          />
        </div>
      )}

      <ApprovedSubmissions />
    </div>
  )
}
