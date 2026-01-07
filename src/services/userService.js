import api from '../api/axios'

export async function fetchTopWorkers() {
  const res = await api.get('/api/stats/top-workers')
  return res.data // { success, workers }
}

export async function fetchPublicStats() {
  const res = await api.get('/api/stats/public')
  return res.data // { success, stats }
}

export async function fetchBuyerSummary() {
  const res = await api.get('/api/stats/buyer/summary')
  return res.data // { success, summary }
}

export async function fetchMyProfile() {
  const res = await api.get('/api/users/me')
  return res.data // { success, user }
}
