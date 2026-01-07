import { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import ThemeToggle from '../common/ThemeToggle'
import NotificationBell from './NotificationBell'
import NotificationPopup from './NotificationPopup'

export default function DashboardNav({ onOpenSidebar }) {
  const { firebaseUser, user } = useAuth()
  const [openNotif, setOpenNotif] = useState(false)

  const coins = user?.coins ?? 0
  const role = user?.role ?? ''

  return (
    <div className="navbar bg-base-100 border-b sticky top-0 z-40">
      <div className="navbar-start gap-2">
        <button
          className="btn btn-ghost lg:hidden"
          type="button"
          onClick={onOpenSidebar}
          aria-label="Open sidebar"
        >
          ☰
        </button>

        <div className="font-bold text-lg">Dashboard</div>
      </div>

      <div className="navbar-end gap-2">
        <ThemeToggle />

        <div className="hidden sm:flex items-center gap-2">
          <div className="badge badge-primary badge-outline">
            Coins: {coins}
          </div>
          {role ? (
            <div className="badge badge-ghost capitalize">{role}</div>
          ) : null}
        </div>

        <div className="relative">
          <NotificationBell onClick={() => setOpenNotif((v) => !v)} />
          <NotificationPopup open={openNotif} />
        </div>

        <div className="flex items-center gap-2">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-medium leading-tight">
              {firebaseUser?.displayName || 'User'}
            </div>
            <div className="text-xs text-base-content/70 leading-tight">
              {firebaseUser?.email}
            </div>
          </div>

          <div className="avatar">
            <div className="w-9 rounded-full">
              <img
                alt="User"
                src={
                  firebaseUser?.photoURL ||
                  'https://i.ibb.co/2nS2d4b/default-user.png'
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
