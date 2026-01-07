import { Navigate } from "react-router-dom";
import useRole from "../../hooks/useRole";
import Loading from "../../components/common/Loading";

export default function DashboardRedirect() {
  const { role, roleLoading } = useRole();

  if (roleLoading) return <Loading label="Loading dashboard..." />;

  if (role === "admin") return <Navigate to="/dashboard/admin/home" replace />;
  if (role === "buyer") return <Navigate to="/dashboard/buyer/home" replace />;
  if (role === "worker") return <Navigate to="/dashboard/worker/home" replace />;

  return <Navigate to="/" replace />;
}