import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

import Card from '../../../components/common/Card'
import TaskForm from '../../../components/buyer/TaskForm'
import { createTask } from '../../../services/taskService'
import useAuth from '../../../hooks/useAuth'

export default function AddTask() {
  const { user, firebaseUser, refreshUser } = useAuth()
  const qc = useQueryClient()
  const navigate = useNavigate()

  const mut = useMutation({
    mutationFn: createTask,
    onSuccess: async () => {
      toast.success('Task created successfully')
      qc.invalidateQueries({ queryKey: ['buyer-my-tasks'] })
      qc.invalidateQueries({ queryKey: ['buyer-summary'] })
      await refreshUser?.()
      navigate('/dashboard/buyer/my-tasks', { replace: true })
    },
    onError: (err) => {
      const msg = err?.response?.data?.message || 'Failed to create task'
      const code = err?.response?.data?.code

      toast.error(msg)

      if (code === 'INSUFFICIENT_COINS') {
        navigate('/dashboard/buyer/purchase-coin')
      }
    },
  })

  const handleSubmit = (payload) => {
    const buyerName = user?.displayName || firebaseUser?.displayName || 'Buyer'

    mut.mutate({
      ...payload,
      buyerName,
    })
  }

  return (
    <Card
      title="Add New Task"
      subtitle="Create a task and allocate coins for worker payments."
    >
      <TaskForm onSubmit={handleSubmit} loading={mut.isPending} />
    </Card>
  )
}
