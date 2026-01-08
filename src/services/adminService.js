import api from '../api/axios'

export async function fetchAdminSummary() {
  const res = await api.get('/api/admin/summary')
  return res.data // { success, summary }
}

export async function fetchPendingWithdrawals() {
  const res = await api.get('/api/admin/withdrawals/pending')
  return res.data // { success, withdrawals }
}

export async function approveWithdrawal(id) {
  const res = await api.patch(`/api/admin/withdrawals/${id}/approve`)
  return res.data // { success, withdrawal, workerCoins }
}

export async function fetchAllUsers() {
  const res = await api.get('/api/admin/users')
  return res.data // { success, users }
}

export async function updateUserRole(id, role) {
  const res = await api.patch(`/api/admin/users/${id}/role`, { role })
  return res.data // { success, user }
}

export async function deleteUser(id) {
  const res = await api.delete(`/api/admin/users/${id}`)
  return res.data // { success, message }
}

export async function fetchAllTasks() {
  const res = await api.get('/api/admin/tasks')
  return res.data // { success, tasks }
}

export async function deleteTaskAdmin(id) {
  const res = await api.delete(`/api/admin/tasks/${id}`)
  return res.data // { success, message }
}
