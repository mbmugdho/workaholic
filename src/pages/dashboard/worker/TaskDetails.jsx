import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'

import { fetchTaskDetails } from '../../../services/taskService'
import { createWorkerSubmission } from '../../../services/submissionService'

import Loading from '../../../components/common/Loading'
import EmptyState from '../../../components/common/EmptyState'
import Card from '../../../components/common/Card'
import SubmissionForm from '../../../components/worker/SubmissionForm'

export default function TaskDetails() {
  const { id } = useParams()
  const qc = useQueryClient()
  const navigate = useNavigate()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['task-details', id],
    queryFn: () => fetchTaskDetails(id),
    enabled: !!id,
  })

  const task = data?.task

  const submitMut = useMutation({
    mutationFn: createWorkerSubmission,
    onSuccess: () => {
      toast.success('Submission sent for review')
      qc.invalidateQueries({ queryKey: ['worker-available-tasks'] })
      qc.invalidateQueries({ queryKey: ['worker-my-submissions'] })
      qc.invalidateQueries({ queryKey: ['worker-summary'] })
      navigate('/dashboard/worker/submissions')
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || 'Submission failed')
    },
  })

  if (isLoading) return <Loading label="Loading task details..." />

  if (isError || !task) {
    return (
      <EmptyState
        title="Task not found"
        message="This task may have been removed or is unavailable."
      />
    )
  }

  return (
    <div className="space-y-6">
      <Card
        title={task.taskTitle}
        subtitle={`Buyer: ${task.buyerName} • Payable: ${task.payableAmount} coins`}
      >
        <div className="grid md:grid-cols-2 gap-4 mt-3">
          <div className="bg-base-200 rounded-xl p-4">
            <div className="text-sm font-semibold">Deadline</div>
            <div className="text-sm text-base-content/70 mt-1">
              {new Date(task.completionDate).toLocaleDateString()}
            </div>

            <div className="text-sm font-semibold mt-4">
              Remaining worker slots
            </div>
            <div className="text-sm text-base-content/70 mt-1">
              {task.requiredWorkers}
            </div>
          </div>

          <div className="bg-base-200 rounded-xl p-4">
            <div className="text-sm font-semibold">What to submit</div>
            <div className="text-sm text-base-content/70 mt-1">
              {task.submissionInfo}
            </div>
          </div>
        </div>

        <div className="mt-5">
          <div className="text-sm font-semibold">Task detail</div>
          <div className="text-sm text-base-content/70 mt-2 whitespace-pre-wrap">
            {task.taskDetail}
          </div>
        </div>
      </Card>

      <Card
        title="Submit your proof"
        subtitle="Your submission will be reviewed by the buyer."
      >
        <SubmissionForm
          submitting={submitMut.isPending}
          onSubmit={({ submissionDetails }) =>
            submitMut.mutate({ taskId: task._id, submissionDetails })
          }
        />
      </Card>
    </div>
  )
}
