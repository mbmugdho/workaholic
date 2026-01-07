import { Link, NavLink } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import useAuth from '../../hooks/useAuth'

export default function Navbar() {
  const { firebaseUser, user, logout, loading } = useAuth()

  const repoUrl = import.meta.env.VITE_CLIENT_REPO_URL || '#'

  const coins = user?.coins ?? 0
  const role = user?.role ?? ''

  return (
    <div className="navbar bg-base-100 border-b sticky top-0 z-50">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-xl">
          Workaholic
        </Link>
      </div>

      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink to="/" end>
              Home
            </NavLink>
          </li>

          {firebaseUser ? (
            <li>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
          ) : null}
        </ul>
      </div>

      <div className="navbar-end gap-2">
        <ThemeToggle />

        {/* Join as Developer */}
        <a
          className="btn btn-sm btn-outline hidden sm:inline-flex"
          href={repoUrl}
          target="_blank"
          rel="noreferrer"
        >
          Join as Developer
        </a>

        {loading ? (
          <span className="loading loading-dots loading-sm" />
        ) : firebaseUser ? (
          <>
            <div className="hidden sm:flex items-center gap-2">
              <div className="badge badge-primary badge-outline">
                Coins: {coins}
              </div>
              {role ? (
                <div className="badge badge-ghost capitalize">{role}</div>
              ) : null}
            </div>

            <div className="dropdown dropdown-end">
              <button className="btn btn-ghost btn-circle avatar" type="button">
                <div className="w-10 rounded-full">
                  <img
                    alt="User avatar"
                    src={
                      firebaseUser.photoURL ||
                      'https://i.ibb.co/2nS2d4b/default-user.png'
                    }
                  />
                </div>
              </button>

              <ul className="menu dropdown-content bg-base-100 rounded-box border shadow z-[1] mt-3 w-56 p-2">
                <li className="px-2 py-1">
                  <div className="text-sm font-medium">
                    {firebaseUser.displayName || 'User'}
                  </div>
                  <div className="text-xs text-base-content/70">
                    {firebaseUser.email}
                  </div>
                </li>

                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>

                <li>
                  <button type="button" onClick={logout}>
                    Logout
                  </button>
                </li>

                <li className="sm:hidden">
                  <a href={repoUrl} target="_blank" rel="noreferrer">
                    Join as Developer
                  </a>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <Link className="btn btn-sm btn-primary" to="/login">
              Login
            </Link>
            <Link className="btn btn-sm btn-outline" to="/register">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
