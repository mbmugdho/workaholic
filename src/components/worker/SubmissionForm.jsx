import { useState } from 'react'

export default function SubmissionForm({ onSubmit, submitting }) {
  const [submissionDetails, setSubmissionDetails] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ submissionDetails })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Submission Details</span>
        </label>
        <textarea
          className="textarea textarea-bordered min-h-[130px]"
          placeholder="Write what you completed and paste proof links if needed."
          value={submissionDetails}
          onChange={(e) => setSubmissionDetails(e.target.value)}
          required
        />
        <p className="text-xs text-base-content/70 mt-2">
          Provide clear proof. Low-quality submissions may be rejected.
        </p>
      </div>

      <button
        className="btn btn-primary w-full"
        disabled={submitting}
        type="submit"
      >
        {submitting ? 'Submitting...' : 'Submit for Review'}
      </button>
    </form>
  )
}
