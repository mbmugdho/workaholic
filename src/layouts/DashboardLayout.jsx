import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import Sidebar from '../components/dashboard/Sidebar'
import DashboardNav from '../components/dashboard/DashboardNav'

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="drawer lg:drawer-open">
      <input
        id="dashboard-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={sidebarOpen}
        onChange={(e) => setSidebarOpen(e.target.checked)}
      />

      <div className="drawer-content flex flex-col min-h-screen">
        <DashboardNav onOpenSidebar={() => setSidebarOpen(true)} />
        <main className="p-4 md:p-6 bg-base-200 flex-1">
          <Outlet />
        </main>
      </div>

      <div className="drawer-side">
        <label
          htmlFor="dashboard-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
          onClick={() => setSidebarOpen(false)}
        />
        <div className="w-72 min-h-full">
          <Sidebar onNavigate={() => setSidebarOpen(false)} />
        </div>
      </div>
    </div>
  )
}
