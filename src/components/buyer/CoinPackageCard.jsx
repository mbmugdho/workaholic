export default function CoinPackageCard({ coins, amountUSD, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect({ coins, amountUSD })}
      className="card bg-base-100 border shadow-sm hover:shadow-md transition-shadow text-left"
    >
      <div className="card-body">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold">{coins} Coins</div>
          <div className="badge badge-primary badge-outline">${amountUSD}</div>
        </div>

        <p className="text-sm text-base-content/70 mt-2">
          Add coins to your account and create tasks without interruption.
        </p>

        <div className="card-actions justify-end mt-4">
          <span className="btn btn-sm btn-primary">Choose</span>
        </div>
      </div>
    </button>
  )
}
