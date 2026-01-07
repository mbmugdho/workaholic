import api from '../api/axios'

export async function fetchBuyerPendingSubmissions() {
  const res = await api.get('/api/submissions/buyer/pending')
  return res.data // { success, submissions }
}

export async function approveBuyerSubmission(id) {
  const res = await api.patch(`/api/submissions/${id}/approve`)
  return res.data // { success, submission, workerCoins }
}

export async function rejectBuyerSubmission(id) {
  const res = await api.patch(`/api/submissions/${id}/reject`)
  return res.data // { success, submission }
}

export async function createWorkerSubmission(payload) {
  const res = await api.post('/api/submissions', payload)
  return res.data // { success, submission }
}

export async function fetchWorkerMySubmissions({ page = 1, limit = 10 }) {
  const res = await api.get(
    `/api/submissions/worker/my?page=${page}&limit=${limit}`
  )
  return res.data // { success, submissions, pagination }
}

export async function fetchWorkerApprovedSubmissions() {
  const res = await api.get('/api/submissions/worker/approved')
  return res.data // { success, submissions }
}
