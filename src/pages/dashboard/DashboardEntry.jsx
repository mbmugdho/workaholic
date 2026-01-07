import useAuth from '../../hooks/useAuth'
import Card from '../../components/common/Card'

export default function DashboardEntry() {
  const { user } = useAuth()

  return (
    <Card
      title="Dashboard"
      subtitle="Role-based pages will be wired in Phase 5."
    >
      <div className="space-y-2">
        <p className="text-sm">
          Your role:{' '}
          <span className="font-medium capitalize">
            {user?.role || 'unknown'}
          </span>
        </p>
        <p className="text-sm">
          Available coins:{' '}
          <span className="font-medium">{user?.coins ?? 0}</span>
        </p>
        <p className="text-sm text-base-content/70">
          Next: we’ll add protected routes and role-based redirects.
        </p>
      </div>
    </Card>
  )
}
