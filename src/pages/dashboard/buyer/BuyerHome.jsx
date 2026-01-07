import Card from '../../../components/common/Card'
import useAuth from '../../../hooks/useAuth'

export default function BuyerHome() {
  const { user } = useAuth()

  return (
    <Card
      title="Buyer Home"
      subtitle="Phase 5 placeholder (stats + review queue will be added in Phase 7)"
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
