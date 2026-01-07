import { Link, Route, Routes } from "react-router-dom";
import ThemeToggle from "./components/common/ThemeToggle";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <div className="min-h-screen">
      <div className="navbar bg-base-100 border-b">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            Workaholic
          </Link>
        </div>
        <div className="flex-none">
          <ThemeToggle />
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}