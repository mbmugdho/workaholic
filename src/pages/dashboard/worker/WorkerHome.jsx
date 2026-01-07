import Card from '../../../components/common/Card'
import useAuth from '../../../hooks/useAuth'

export default function WorkerHome() {
  const { user } = useAuth()

  return (
    <Card
      title="Worker Home"
      subtitle="Phase 5 placeholder (stats will be added in Phase 8)"
    >
      <p className="text-sm">
        Role: <span className="font-medium capitalize">{user?.role}</span>
      </p>
      <p className="text-sm">
        Coins: <span className="font-medium">{user?.coins ?? 0}</span>
      </p>
    </Card>
  )
}
