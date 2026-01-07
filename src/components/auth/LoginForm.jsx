import { useState } from 'react'
import { isValidEmail } from '../../utils/validators'

export default function LoginForm({ onSubmit, loading }) {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setError('')
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isValidEmail(form.email))
      return setError('Please enter a valid email.')
    if (!form.password) return setError('Password is required.')
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error ? <div className="alert alert-error">{error}</div> : null}

      <div className="form-control">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          className="input input-bordered"
          placeholder="you@example.com"
          required
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          className="input input-bordered"
          placeholder="Your password"
          required
        />
      </div>

      <button
        disabled={loading}
        className="btn btn-primary w-full"
        type="submit"
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  )
}
