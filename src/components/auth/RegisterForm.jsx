import { useState } from 'react'
import { isStrongPassword, isValidEmail } from '../../utils/validators'

export default function RegisterForm({ onSubmit, loading }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    photoURL: '',
    password: '',
    role: 'worker',
  })

  const [error, setError] = useState('')

  const handleChange = (e) => {
    setError('')
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!form.name.trim()) return setError('Name is required.')
    if (!isValidEmail(form.email))
      return setError('Please enter a valid email.')
    if (!isStrongPassword(form.password)) {
      return setError(
        'Password must be 8+ chars and include uppercase, lowercase, number, and special character.'
      )
    }
    if (!['worker', 'buyer'].includes(form.role)) {
      return setError('Please select Worker or Buyer.')
    }

    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error ? <div className="alert alert-error">{error}</div> : null}

      <div className="form-control">
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="input input-bordered"
          placeholder="Your full name"
          required
        />
      </div>

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
          <span className="label-text">Profile Picture URL</span>
        </label>
        <input
          name="photoURL"
          value={form.photoURL}
          onChange={handleChange}
          className="input input-bordered"
          placeholder="https://..."
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Role</span>
        </label>
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="select select-bordered"
          required
        >
          <option value="worker">Worker</option>
          <option value="buyer">Buyer</option>
        </select>
        <p className="text-xs text-base-content/70 mt-2">
          Worker gets 10 coins, Buyer gets 50 coins (only once on registration).
        </p>
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
          placeholder="Strong password"
          required
        />
      </div>

      <button
        disabled={loading}
        className="btn btn-primary w-full"
        type="submit"
      >
        {loading ? 'Creating account...' : 'Create Account'}
      </button>
    </form>
  )
}
