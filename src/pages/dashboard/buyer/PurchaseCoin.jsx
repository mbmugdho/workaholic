import { useNavigate } from 'react-router-dom'
import CoinPackageCard from '../../../components/buyer/CoinPackageCard'

const PACKAGES = [
  { coins: 10, amountUSD: 1 },
  { coins: 150, amountUSD: 10 },
  { coins: 500, amountUSD: 20 },
  { coins: 1000, amountUSD: 35 },
]

export default function PurchaseCoin() {
  const navigate = useNavigate()

  const handleSelect = ({ coins, amountUSD }) => {
    const params = new URLSearchParams({
      coins: String(coins),
      amountUSD: String(amountUSD),
    })
    navigate(`/dashboard/buyer/checkout?${params.toString()}`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Purchase Coin</h1>
        <p className="text-sm text-base-content/70 mt-1">
          Choose a package. Payment is simulated (dummy) and validated on the
          server.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {PACKAGES.map((p) => (
          <CoinPackageCard
            key={p.coins}
            coins={p.coins}
            amountUSD={p.amountUSD}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </div>
  )
}
