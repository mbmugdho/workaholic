import Card from '../../../components/common/Card'
import useAuth from '../../../hooks/useAuth'

export default function AdminHome() {
  const { user } = useAuth()

  return (
    <Card
      title="Admin Home"
      subtitle="Phase 5 placeholder (platform stats will be added in Phase 9)"
    >
      <p className="text-sm">
        Role: <span className="font-medium capitalize">{user?.role}</span>
      </p>
      <p className="text-sm">
        Coins (not relevant for admin):{' '}
        <span className="font-medium">{user?.coins ?? 0}</span>
      </p>
    </Card>
  )
}
