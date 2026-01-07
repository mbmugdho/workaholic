import { Link } from "react-router-dom";
import useAuth from "./../hooks/useAuth";

export default function Home() {
  const { user, firebaseUser, logout, loading } = useAuth();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="card bg-base-100 border shadow-sm">
        <div className="card-body">
          <h1 className="card-title">Workaholic</h1>

          {loading ? (
            <p className="text-base-content/70">Checking session...</p>
          ) : firebaseUser ? (
            <div className="space-y-2">
              <p>
                Logged in as: <span className="font-medium">{firebaseUser.email}</span>
              </p>
              <p>
                Role: <span className="font-medium">{user?.role || "..."}</span> | Coins:{" "}
                <span className="font-medium">{user?.coins ?? "..."}</span>
              </p>
              <button onClick={logout} className="btn btn-outline btn-sm">
                Logout
              </button>
            </div>
          ) : (
            <div className="space-x-3">
              <Link className="btn btn-primary btn-sm" to="/login">
                Login
              </Link>
              <Link className="btn btn-outline btn-sm" to="/register">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}