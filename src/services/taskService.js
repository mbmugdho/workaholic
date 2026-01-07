import api from '../api/axios'

export async function createTask(payload) {
  const res = await api.post('/api/tasks', payload)
  return res.data // { success, task, buyerCoins }
}

export async function fetchMyTasks() {
  const res = await api.get('/api/tasks/my')
  return res.data // { success, tasks }
}

export async function updateTask(id, payload) {
  const res = await api.patch(`/api/tasks/${id}`, payload)
  return res.data // { success, task }
}

export async function deleteTask(id) {
  const res = await api.delete(`/api/tasks/${id}`)
  return res.data // { success, refundCoins, buyerCoins }
}

export async function fetchAvailableTasks() {
  const res = await api.get("/api/tasks/available");
  return res.data; // { success, tasks }
}

export async function fetchTaskDetails(id) {
  const res = await api.get(`/api/tasks/details/${id}`);
  return res.data;
}
