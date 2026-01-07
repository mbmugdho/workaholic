export default function PaymentForm({ coins, amountUSD, onPay, paying }) {
  return (
    <div className="space-y-4">
      <div className="alert">
        <div>
          <div className="font-semibold">Dummy payment</div>
          <div className="text-sm opacity-80">
            This project uses a simulated payment flow. Server will only accept
            fixed packages.
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="stat bg-base-100 border rounded-xl">
          <div className="stat-title">Coins</div>
          <div className="stat-value text-primary">{coins}</div>
          <div className="stat-desc">Added to your balance</div>
        </div>

        <div className="stat bg-base-100 border rounded-xl">
          <div className="stat-title">Amount</div>
          <div className="stat-value text-primary">${amountUSD}</div>
          <div className="stat-desc">Charged (simulated)</div>
        </div>
      </div>

      <button
        type="button"
        className="btn btn-primary w-full"
        onClick={onPay}
        disabled={paying}
      >
        {paying ? 'Processing...' : 'Confirm Payment'}
      </button>
    </div>
  )
}
