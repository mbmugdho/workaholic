export default function StatsCard({ label, value, hint }) {
  return (
    <div className="stat bg-base-100 border rounded-xl shadow-sm">
      <div className="stat-title">{label}</div>
      <div className="stat-value text-primary">{value}</div>
      {hint ? <div className="stat-desc">{hint}</div> : null}
    </div>
  )
}
