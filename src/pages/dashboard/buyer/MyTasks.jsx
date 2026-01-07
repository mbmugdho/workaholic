import { useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import {
  deleteTask,
  fetchMyTasks,
  updateTask,
} from '../../../services/taskService'
import Loading from '../../../components/common/Loading'
import EmptyState from '../../../components/common/EmptyState'
import UpdateTaskModal from '../../../components/buyer/UpdateTaskModal'
import TaskTable from '../../../components/buyer/TaskTable'
import useAuth from '../../../hooks/useAuth'

export default function MyTasks() {
  const qc = useQueryClient()
  const { refreshUser } = useAuth()

  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(null)

  const { data, isLoading, isError } = useQuery({
    queryKey: ['buyer-my-tasks'],
    queryFn: fetchMyTasks,
  })

  const tasks = useMemo(() => data?.tasks || [], [data])

  const updateMut = useMutation({
    mutationFn: ({ id, payload }) => updateTask(id, payload),
    onSuccess: () => {
      toast.success('Task updated')
      qc.invalidateQueries({ queryKey: ['buyer-my-tasks'] })
      setOpen(false)
      setActive(null)
    },
    onError: (err) =>
      toast.error(err?.response?.data?.message || 'Update failed'),
  })

  const deleteMut = useMutation({
    mutationFn: deleteTask,
    onSuccess: async (res) => {
      toast.success(`Task deleted. Refunded ${res?.refundCoins ?? 0} coins.`)
      qc.invalidateQueries({ queryKey: ['buyer-my-tasks'] })
      qc.invalidateQueries({ queryKey: ['buyer-summary'] })
      await refreshUser?.()
    },
    onError: (err) =>
      toast.error(err?.response?.data?.message || 'Delete failed'),
  })

  const handleEdit = (task) => {
    setActive(task)
    setOpen(true)
  }

  const handleDelete = (id) => {
    deleteMut.mutate(id)
  }

  const handleSave = (payload) => {
    if (!active?._id) return
    updateMut.mutate({ id: active._id, payload })
  }

  if (isLoading) return <Loading label="Loading your tasks..." />

  if (isError) {
    return (
      <EmptyState
        title="Could not load tasks"
        message="Please refresh and try again."
      />
    )
  }

  if (tasks.length === 0) {
    return (
      <EmptyState
        title="No tasks created yet"
        message="Create your first task from the Add New Tasks page."
      />
    )
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold">My Tasks</h1>
        <p className="text-sm text-base-content/70 mt-1">
          Update task details or delete tasks to refund remaining worker slots.
        </p>
      </div>

      <TaskTable
        tasks={tasks}
        onEdit={handleEdit}
        onDelete={handleDelete}
        deletingId={deleteMut.isPending ? deleteMut.variables : null}
      />

      <UpdateTaskModal
        open={open}
        task={active}
        onClose={() => {
          setOpen(false)
          setActive(null)
        }}
        saving={updateMut.isPending}
        onSave={handleSave}
      />
    </div>
  )
}
