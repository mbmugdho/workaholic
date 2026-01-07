export default function Modal({ open, title, children, onClose, actions }) {
  if (!open) return null

  return (
    <div className="modal modal-open" role="dialog" aria-modal="true">
      <div className="modal-box">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-bold text-lg">{title || 'Details'}</h3>
          <button
            className="btn btn-sm btn-ghost"
            onClick={onClose}
            type="button"
          >
            ✕
          </button>
        </div>

        <div className="py-4">{children}</div>

        <div className="modal-action">
          {actions ? (
            actions
          ) : (
            <button className="btn" onClick={onClose}>
              Close
            </button>
          )}
        </div>
      </div>

      {/* backdrop */}
      <div className="modal-backdrop" onClick={onClose} />
    </div>
  )
}
