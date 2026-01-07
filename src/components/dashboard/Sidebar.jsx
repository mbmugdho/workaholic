import { NavLink } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

function NavItem({ to, label }) {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive ? 'active font-medium' : undefined
        }
        end
      >
        {label}
      </NavLink>
    </li>
  )
}

export default function Sidebar({ onNavigate }) {
  const { user } = useAuth()
  const role = user?.role

  return (
    <div className="h-full bg-base-200 border-r">
      <div className="p-4 border-b">
        <div className="text-xl font-bold">Workaholic</div>
        <div className="text-xs text-base-content/70 mt-1 capitalize">
          {role ? `${role} Panel` : 'Dashboard'}
        </div>
      </div>

      <ul className="menu p-4 gap-1">
        <NavItem to="/" label="Home" />

        {/* Worker */}
        {role === 'worker' ? (
          <>
            <NavItem to="/dashboard/worker/home" label="Worker Home" />
            <NavItem to="/dashboard/worker/tasklist" label="TaskList" />
            <NavItem
              to="/dashboard/worker/submissions"
              label="My Submissions"
            />
            <NavItem to="/dashboard/worker/withdrawals" label="Withdrawals" />
          </>
        ) : null}

        {/* Buyer */}
        {role === 'buyer' ? (
          <>
            <NavItem to="/dashboard/buyer/home" label="Buyer Home" />
            <NavItem to="/dashboard/buyer/add-task" label="Add New Tasks" />
            <NavItem to="/dashboard/buyer/my-tasks" label="My Tasks" />
            <NavItem
              to="/dashboard/buyer/purchase-coin"
              label="Purchase Coin"
            />
            <NavItem to="/dashboard/buyer/payments" label="Payment History" />
          </>
        ) : null}

        {/* Admin */}
        {role === 'admin' ? (
          <>
            <NavItem to="/dashboard/admin/home" label="Admin Home" />
            <NavItem
              to="/dashboard/admin/withdraw-requests"
              label="Withdraw Requests"
            />
            <NavItem to="/dashboard/admin/manage-users" label="Manage Users" />
            <NavItem to="/dashboard/admin/manage-tasks" label="Manage Tasks" />
          </>
        ) : null}
      </ul>
    </div>
  )
}
