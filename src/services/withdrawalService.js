import api from '../api/axios'

export async function createWithdrawal(payload) {
  const res = await api.post('/api/withdrawals', payload)
  return res.data // { success, withdrawal }
}

export async function fetchMyWithdrawals() {
  const res = await api.get('/api/withdrawals/my')
  return res.data // { success, withdrawals }
}
