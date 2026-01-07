export default function NotificationBell({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="btn btn-ghost btn-circle"
      aria-label="Notifications"
      title="Notifications"
    >
      {/* Placeholder icon (we'll replace with lucide-animated in Phase 10) */}
      <span className="text-lg">🔔</span>
    </button>
  )
}
