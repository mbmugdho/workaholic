import { useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import Card from '../../../components/common/Card'
import PaymentForm from '../../../components/buyer/PaymentForm'
import { createDummyPayment } from '../../../services/paymentService'
import useAuth from '../../../hooks/useAuth'

export default function Checkout() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { refreshUser } = useAuth()

  const coins = Number(searchParams.get('coins'))
  const amountUSD = Number(searchParams.get('amountUSD'))

  const valid = useMemo(() => {
    return (
      Number.isFinite(coins) &&
      coins > 0 &&
      Number.isFinite(amountUSD) &&
      amountUSD > 0
    )
  }, [coins, amountUSD])

  const payMut = useMutation({
    mutationFn: createDummyPayment,
    onSuccess: async () => {
      toast.success('Payment successful. Coins added.')
      // Refresh coins in navbar/dashboard
      try {
        await refreshUser?.()
      } catch {
        // toast already handled in AuthContext if exchange fails
      }
      navigate('/dashboard/buyer/payments', { replace: true })
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || 'Payment failed')
    },
  })

  if (!valid) {
    return (
      <Card
        title="Checkout"
        subtitle="Invalid package selection"
        actions={
          <button
            className="btn btn-outline"
            onClick={() => navigate('/dashboard/buyer/purchase-coin')}
          >
            Back to packages
          </button>
        }
      >
        <p className="text-sm text-base-content/70">
          Please select a valid package from the Purchase Coin page.
        </p>
      </Card>
    )
  }

  return (
    <Card
      title="Checkout"
      subtitle="Confirm your package to add coins to your buyer balance."
    >
      <PaymentForm
        coins={coins}
        amountUSD={amountUSD}
        paying={payMut.isPending}
        onPay={() => payMut.mutate({ coins, amountUSD })}
      />
    </Card>
  )
}
