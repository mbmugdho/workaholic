import { Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useRole from '../hooks/useRole'
import Loading from '../components/common/Loading'

export default function BuyerRoute({ children }) {
  const { firebaseUser } = useAuth()
  const { isBuyer, roleLoading } = useRole()

  if (roleLoading) return <Loading label="Checking role..." />

  if (!firebaseUser) return <Navigate to="/login" replace />
  if (!isBuyer) return <Navigate to="/dashboard" replace />

  return children
}
