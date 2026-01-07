import { Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useRole from '../hooks/useRole'
import Loading from '../components/common/Loading'

export default function AdminRoute({ children }) {
  const { firebaseUser } = useAuth()
  const { isAdmin, roleLoading } = useRole()

  if (roleLoading) return <Loading label="Checking role..." />

  if (!firebaseUser) return <Navigate to="/login" replace />
  if (!isAdmin) return <Navigate to="/dashboard" replace />

  return children
}
