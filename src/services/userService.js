import api from "../api/axios";

export async function fetchTopWorkers() {
  const res = await api.get("/api/stats/top-workers");
  return res.data; // { success, workers }
}

export async function fetchPublicStats() {
  const res = await api.get("/api/stats/public");
  return res.data; // { success, stats }
}