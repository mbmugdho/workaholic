export default function Card({ title, subtitle, children, actions }) {
  return (
    <div className="card bg-base-100 border shadow-sm">
      <div className="card-body">
        {title ? <h2 className="card-title">{title}</h2> : null}
        {subtitle ? (
          <p className="text-sm text-base-content/70">{subtitle}</p>
        ) : null}

        {children}

        {actions ? (
          <div className="card-actions justify-end">{actions}</div>
        ) : null}
      </div>
    </div>
  )
}
