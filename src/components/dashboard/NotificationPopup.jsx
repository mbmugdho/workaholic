export default function NotificationPopup({ open }) {
  if (!open) return null

  return (
    <div className="absolute right-0 mt-2 w-80 max-w-[90vw] bg-base-100 border rounded-xl shadow-lg p-3 z-50">
      <div className="font-semibold">Notifications</div>
      <p className="text-sm text-base-content/70 mt-2">
        Notification system will be connected in Phase 10.
      </p>
    </div>
  )
}
