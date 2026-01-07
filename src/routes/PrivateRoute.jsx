import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../components/common/Loading";

export default function PrivateRoute({ children }) {
  const { firebaseUser, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loading label="Checking authentication..." />;

  if (!firebaseUser) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}