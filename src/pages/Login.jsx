import { Link, useNavigate } from 'react-router-dom'
import LoginForm from '../components/auth/LoginForm'
import GoogleSignIn from '../components/auth/GoogleSignIn'
import useAuth from '../hooks/useAuth'

export default function Login() {
  const { login, loginWithGoogle, loading } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async ({ email, password }) => {
    await login({ email, password })
    navigate('/')
  }

  const handleGoogle = async ({ role }) => {
    await loginWithGoogle({ role })
    navigate('/')
  }

  return (
    <div className="min-h-[calc(100vh-0px)] flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-100 border shadow-sm">
        <div className="card-body">
          <h1 className="card-title">Login</h1>
          <p className="text-sm text-base-content/70">
            Access your dashboard after login.
          </p>

          <LoginForm onSubmit={handleLogin} loading={loading} />

          <div className="divider">OR</div>

          <GoogleSignIn onGoogle={handleGoogle} loading={loading} />

          <p className="text-sm mt-4">
            New here?{' '}
            <Link className="link link-primary" to="/register">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
