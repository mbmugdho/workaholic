import { Link, useNavigate } from 'react-router-dom'
import RegisterForm from '../components/auth/RegisterForm'
import useAuth from '../hooks/useAuth'

export default function Register() {
  const { register, loading } = useAuth()
  const navigate = useNavigate()

  const handleRegister = async (payload) => {
    await register(payload)
    navigate('/')
  }

  return (
    <div className="min-h-[calc(100vh-0px)] flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-100 border shadow-sm">
        <div className="card-body">
          <h1 className="card-title">Create your account</h1>
          <p className="text-sm text-base-content/70">
            Join as Worker or Buyer and start earning or posting tasks.
          </p>

          <RegisterForm onSubmit={handleRegister} loading={loading} />

          <p className="text-sm mt-4">
            Already have an account?{' '}
            <Link className="link link-primary" to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
