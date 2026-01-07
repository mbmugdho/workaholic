import { useEffect, useState } from 'react'
import Modal from '../common/Modal'

export default function UpdateTaskModal({
  open,
  task,
  onClose,
  onSave,
  saving,
}) {
  const [form, setForm] = useState({
    taskTitle: '',
    taskDetail: '',
    submissionInfo: '',
  })

  useEffect(() => {
    if (!task) return
    setForm({
      taskTitle: task.taskTitle || '',
      taskDetail: task.taskDetail || '',
      submissionInfo: task.submissionInfo || '',
    })
  }, [task])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((p) => ({ ...p, [name]: value }))
  }

  return (
    <Modal
      open={open}
      title="Update Task"
      onClose={onClose}
      actions={
        <>
          <button className="btn btn-ghost" type="button" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            type="button"
            disabled={saving}
            onClick={() => onSave(form)}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </>
      }
    >
      <div className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Task Title</span>
          </label>
          <input
            className="input input-bordered"
            name="taskTitle"
            value={form.taskTitle}
            onChange={handleChange}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Task Detail</span>
          </label>
          <textarea
            className="textarea textarea-bordered min-h-[110px]"
            name="taskDetail"
            value={form.taskDetail}
            onChange={handleChange}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Submission Info</span>
          </label>
          <input
            className="input input-bordered"
            name="submissionInfo"
            value={form.submissionInfo}
            onChange={handleChange}
          />
        </div>
      </div>
    </Modal>
  )
}
