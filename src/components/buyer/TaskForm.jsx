import { useState } from 'react'

export default function TaskForm({ onSubmit, loading }) {
  const [form, setForm] = useState({
    taskTitle: '',
    taskDetail: '',
    requiredWorkers: 50,
    payableAmount: 5,
    completionDate: '',
    submissionInfo: '',
    taskImageUrl: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]:
        name === 'requiredWorkers' || name === 'payableAmount'
          ? Number(value)
          : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Task Title</span>
        </label>
        <input
          className="input input-bordered"
          name="taskTitle"
          value={form.taskTitle}
          onChange={handleChange}
          placeholder="Example: Watch my YouTube video and leave a thoughtful comment"
          required
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
          placeholder="Explain the steps clearly so workers can submit correct proof."
          required
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Required Workers</span>
          </label>
          <input
            className="input input-bordered"
            type="number"
            min={1}
            name="requiredWorkers"
            value={form.requiredWorkers}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Payable Amount (per worker)</span>
          </label>
          <input
            className="input input-bordered"
            type="number"
            min={1}
            name="payableAmount"
            value={form.payableAmount}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Completion Date</span>
        </label>
        <input
          className="input input-bordered"
          type="date"
          name="completionDate"
          value={form.completionDate}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Submission Info (what to submit)</span>
        </label>
        <input
          className="input input-bordered"
          name="submissionInfo"
          value={form.submissionInfo}
          onChange={handleChange}
          placeholder="Example: Submit a screenshot link + the comment text you posted"
          required
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Task Image URL</span>
        </label>
        <input
          className="input input-bordered"
          name="taskImageUrl"
          value={form.taskImageUrl}
          onChange={handleChange}
          placeholder="https://..."
          required
        />
      </div>

      <button
        disabled={loading}
        className="btn btn-primary w-full"
        type="submit"
      >
        {loading ? 'Creating...' : 'Add Task'}
      </button>
    </form>
  )
}
