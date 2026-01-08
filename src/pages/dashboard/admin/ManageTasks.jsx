import { useQuery } from '@tanstack/react-query'
import Loading from '../../../components/common/Loading'
import EmptyState from '../../../components/common/EmptyState'
import TasksTable from '../../../components/admin/TasksTable'
import { fetchAllTasks } from '../../../services/adminService'

export default function ManageTasks() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['admin-tasks'],
    queryFn: fetchAllTasks,
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
        title="No tasks found"
        message="Tasks created by buyers will appear here."
      />
    )
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold">Manage Tasks</h1>
        <p className="text-sm text-base-content/70 mt-1">
          Remove tasks that violate rules or are no longer valid.
        </p>
      </div>

      <TasksTable tasks={tasks} />
    </div>
  )
}
