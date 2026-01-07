export default function Pagination({ page, totalPages, onPageChange }) {
  if (!totalPages || totalPages <= 1) return null

  const canPrev = page > 1
  const canNext = page < totalPages

  return (
    <div className="join flex justify-center mt-6">
      <button
        className="btn join-item"
        disabled={!canPrev}
        onClick={() => onPageChange(page - 1)}
        type="button"
      >
        Prev
      </button>

      <button className="btn join-item btn-ghost" type="button" disabled>
        Page {page} / {totalPages}
      </button>

      <button
        className="btn join-item"
        disabled={!canNext}
        onClick={() => onPageChange(page + 1)}
        type="button"
      >
        Next
      </button>
    </div>
  )
}
