import api from '../api/axios'

export async function createDummyPayment(payload) {
  const res = await api.post('/api/payments/dummy', payload)
  return res.data // { success, payment, buyerCoins }
}

export async function fetchMyPayments() {
  const res = await api.get('/api/payments/my')
  return res.data // { success, payments }
}
