import { useQuery } from '@tanstack/react-query'
import { fetchAvailableTasks } from '../../../services/taskService'
import Loading from '../../../components/common/Loading'
import EmptyState from '../../../components/common/EmptyState'
import TaskCard from '../../../components/worker/TaskCard'

export default function TaskList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['worker-available-tasks'],
    queryFn: fetchAvailableTasks,
  })

  if (isLoading) return <Loading label="Loading tasks..." />

  if (isError) {
    return (
      <EmptyState
        title="Could not load tasks"
        message="Please try again later."
      />
    )
  }

  const tasks = data?.tasks || []

  if (tasks.length === 0) {
    return (
      <EmptyState
        title="No tasks available right now"
        message="Check back soon for new tasks."
      />
    )
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold">TaskList</h1>
        <p className="text-sm text-base-content/70 mt-1">
          Tasks with available worker slots. Submit proof before the deadline.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {tasks.map((t) => (
          <TaskCard key={t._id} task={t} />
        ))}
      </div>
    </div>
  )
}
