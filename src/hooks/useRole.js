import useAuth from "./useAuth";

export default function useRole() {
  const { user, loading } = useAuth();
  const role = user?.role || null;

  return {
    role,
    roleLoading: loading,
    isAdmin: role === "admin",
    isBuyer: role === "buyer",
    isWorker: role === "worker",
  };
}