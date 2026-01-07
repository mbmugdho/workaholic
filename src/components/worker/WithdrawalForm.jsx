import { useMemo, useState } from 'react'

const COINS_PER_USD = 20
const MIN_COINS = 200

export default function WithdrawalForm({
  availableCoins,
  onSubmit,
  submitting,
}) {
  const [withdrawalCoin, setWithdrawalCoin] = useState(200)
  const [paymentSystem, setPaymentSystem] = useState('Bkash')
  const [accountNumber, setAccountNumber] = useState('')

  const eligible = availableCoins >= MIN_COINS

  const withdrawalAmountUSD = useMemo(() => {
    const coins = Number(withdrawalCoin) || 0
    return (coins / COINS_PER_USD).toFixed(2)
  }, [withdrawalCoin])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      withdrawalCoin: Number(withdrawalCoin),
      paymentSystem,
      accountNumber,
    })
  }

  return (
    <div className="space-y-4">
      <div className="alert">
        <div className="space-y-1">
          <div className="font-semibold">Withdrawal rules</div>
          <div className="text-sm opacity-80">
            Minimum 200 coins. Conversion rate: 20 coins = $1.
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="stat bg-base-100 border rounded-xl">
          <div className="stat-title">Your Coins</div>
          <div className="stat-value text-primary">{availableCoins}</div>
          <div className="stat-desc">Available right now</div>
        </div>

        <div className="stat bg-base-100 border rounded-xl">
          <div className="stat-title">Estimated USD</div>
          <div className="stat-value text-primary">
            ${(availableCoins / COINS_PER_USD).toFixed(2)}
          </div>
          <div className="stat-desc">If you withdraw all</div>
        </div>
      </div>

      {!eligible ? (
        <div className="alert alert-warning">
          <div>
            <div className="font-semibold">Insufficient coin</div>
            <div className="text-sm opacity-80">
              You need at least 200 coins to request a withdrawal.
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Coin To Withdraw</span>
              </label>
              <input
                type="number"
                min={1}
                max={availableCoins}
                value={withdrawalCoin}
                onChange={(e) => setWithdrawalCoin(e.target.value)}
                className="input input-bordered"
                required
              />
              <p className="text-xs text-base-content/70 mt-2">
                Cannot exceed {availableCoins} coins.
              </p>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Withdraw Amount (USD)</span>
              </label>
              <input
                value={withdrawalAmountUSD}
                className="input input-bordered"
                readOnly
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Payment System</span>
              </label>
              <select
                className="select select-bordered"
                value={paymentSystem}
                onChange={(e) => setPaymentSystem(e.target.value)}
              >
                <option>Stripe</option>
                <option>Bkash</option>
                <option>Rocket</option>
                <option>Nagad</option>
                <option>Other</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Account Number</span>
              </label>
              <input
                className="input input-bordered"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="Enter account number"
                required
              />
            </div>
          </div>

          <button
            className="btn btn-primary w-full"
            disabled={submitting}
            type="submit"
          >
            {submitting ? 'Requesting...' : 'Withdraw'}
          </button>
        </form>
      )}
    </div>
  )
}
