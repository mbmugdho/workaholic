import api from "../api/axios";

export async function fetchBuyerPendingSubmissions() {
  const res = await api.get("/api/submissions/buyer/pending");
  return res.data; // { success, submissions }
}

export async function approveBuyerSubmission(id) {
  const res = await api.patch(`/api/submissions/${id}/approve`);
  return res.data; // { success, submission, workerCoins }
}

export async function rejectBuyerSubmission(id) {
  const res = await api.patch(`/api/submissions/${id}/reject`);
  return res.data; // { success, submission }
}