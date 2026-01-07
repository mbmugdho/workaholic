import { useQuery } from '@tanstack/react-query'
import Loading from '../../../components/common/Loading'
import EmptyState from '../../../components/common/EmptyState'
import Pagination from '../../../components/common/Pagination'
import SubmissionTable from '../../../components/worker/SubmissionTable'
import usePagination from '../../../hooks/usePagination'
import { fetchWorkerMySubmissions } from '../../../services/submissionService'

export default function MySubmissions() {
  const { page, setPage, limit } = usePagination({
    initialPage: 1,
    initialLimit: 10,
  })

  const { data, isLoading, isError } = useQuery({
    queryKey: ['worker-my-submissions', page, limit],
    queryFn: () => fetchWorkerMySubmissions({ page, limit }),
    keepPreviousData: true,
  })

  if (isLoading) return <Loading label="Loading your submissions..." />

  if (isError) {
    return (
      <EmptyState
        title="Could not load submissions"
        message="Please try again later."
      />
    )
  }

  const submissions = data?.submissions || []
  const pagination = data?.pagination

  if (submissions.length === 0) {
    return (
      <EmptyState
        title="No submissions yet"
        message="Submit tasks from the TaskList to see them here."
      />
    )
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold">My Submissions</h1>
        <p className="text-sm text-base-content/70 mt-1">
          Paginated list of all your submissions with status highlighting.
        </p>
      </div>

      <SubmissionTable submissions={submissions} />

      <Pagination
        page={pagination?.page ?? page}
        totalPages={pagination?.totalPages ?? 1}
        onPageChange={(p) => setPage(p)}
      />
    </div>
  )
}
