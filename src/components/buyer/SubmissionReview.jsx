import { useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import Table from '../common/Table'
import Modal from '../common/Modal'
import Loading from '../common/Loading'
import EmptyState from '../common/EmptyState'

import {
  approveBuyerSubmission,
  fetchBuyerPendingSubmissions,
  rejectBuyerSubmission,
} from '../../services/submissionService'

export default function SubmissionReview() {
  const qc = useQueryClient()
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(null)

  const { data, isLoading, isError } = useQuery({
    queryKey: ['buyer-pending-submissions'],
    queryFn: fetchBuyerPendingSubmissions,
  })

  const submissions = useMemo(() => data?.submissions || [], [data])

  const approveMut = useMutation({
    mutationFn: approveBuyerSubmission,
    onSuccess: () => {
      toast.success('Submission approved')
      qc.invalidateQueries({ queryKey: ['buyer-pending-submissions'] })
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || 'Approve failed')
    },
  })

  const rejectMut = useMutation({
    mutationFn: rejectBuyerSubmission,
    onSuccess: () => {
      toast.success('Submission rejected')
      qc.invalidateQueries({ queryKey: ['buyer-pending-submissions'] })
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || 'Reject failed')
    },
  })

  if (isLoading) return <Loading label="Loading review queue..." />
  if (isError) {
    return (
      <EmptyState
        title="Could not load submissions"
        message="Please refresh and try again."
      />
    )
  }

  return (
    <div className="mt-6">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold">Task To Review</h3>
          <p className="text-sm text-base-content/70 mt-1">
            Pending submissions for your tasks.
          </p>
        </div>
        <div className="badge badge-outline">{submissions.length} pending</div>
      </div>

      {submissions.length === 0 ? (
        <div className="mt-4">
          <EmptyState
            title="No pending submissions"
            message="When workers submit proofs, you will see them here."
          />
        </div>
      ) : (
        <div className="mt-4">
          <Table>
            <thead>
              <tr>
                <th>Worker</th>
                <th>Task</th>
                <th>Payable</th>
                <th>View</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((s) => (
                <tr key={s._id}>
                  <td>
                    <div className="font-medium">{s.workerName}</div>
                    <div className="text-xs text-base-content/70">
                      {s.workerEmail}
                    </div>
                  </td>
                  <td className="max-w-[280px]">
                    <div className="font-medium">{s.taskTitle}</div>
                    <div className="text-xs text-base-content/70">
                      Submitted: {new Date(s.createdAt).toLocaleString()}
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-primary badge-outline">
                      {s.payableAmount} coins
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline"
                      type="button"
                      onClick={() => {
                        setActive(s)
                        setOpen(true)
                      }}
                    >
                      View
                    </button>
                  </td>
                  <td className="space-x-2">
                    <button
                      className="btn btn-sm btn-success"
                      type="button"
                      disabled={approveMut.isPending || rejectMut.isPending}
                      onClick={() => approveMut.mutate(s._id)}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      type="button"
                      disabled={approveMut.isPending || rejectMut.isPending}
                      onClick={() => rejectMut.mutate(s._id)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      <Modal
        open={open}
        title="Submission Details"
        onClose={() => {
          setOpen(false)
          setActive(null)
        }}
      >
        {active ? (
          <div className="space-y-3">
            <div>
              <div className="text-sm font-semibold">Worker</div>
              <div className="text-sm text-base-content/70">
                {active.workerName} — {active.workerEmail}
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold">Task</div>
              <div className="text-sm text-base-content/70">
                {active.taskTitle}
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold">Proof / Details</div>
              <div className="text-sm text-base-content/70 whitespace-pre-wrap">
                {active.submissionDetails}
              </div>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  )
}
