import { Route, Routes } from 'react-router-dom'

import MainLayout from '../layouts/MainLayout'
import DashboardLayout from '../layouts/DashboardLayout'

import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'

import PrivateRoute from './PrivateRoute'
import AdminRoute from './AdminRoute'
import BuyerRoute from './BuyerRoute'
import WorkerRoute from './WorkerRoute'

import DashboardRedirect from '../pages/dashboard/DashboardRedirect'

import WorkerHome from '../pages/dashboard/worker/WorkerHome'
import BuyerHome from '../pages/dashboard/buyer/BuyerHome'
import AdminHome from '../pages/dashboard/admin/AdminHome'

// Buyer payment pages
import PurchaseCoin from '../pages/dashboard/buyer/PurchaseCoin'
import Checkout from '../pages/dashboard/buyer/Checkout'
import PaymentHistory from '../pages/dashboard/buyer/PaymentHistory'
import AddTask from '../pages/dashboard/buyer/AddTask'
import MyTasks from '../pages/dashboard/buyer/MyTasks'

import TaskList from '../pages/dashboard/worker/TaskList'
import TaskDetails from '../pages/dashboard/worker/TaskDetails'
import MySubmissions from '../pages/dashboard/worker/MySubmissions'
import Withdrawals from '../pages/dashboard/worker/Withdrawals'
import WithdrawRequests from '../pages/dashboard/admin/WithdrawRequests'

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<DashboardRedirect />} />

        <Route
          path="worker/home"
          element={
            <WorkerRoute>
              <WorkerHome />
            </WorkerRoute>
          }
        />
        <Route
          path="worker/tasklist"
          element={
            <WorkerRoute>
              <TaskList />
            </WorkerRoute>
          }
        />

        <Route
          path="worker/tasks/:id"
          element={
            <WorkerRoute>
              <TaskDetails />
            </WorkerRoute>
          }
        />

        <Route
          path="worker/submissions"
          element={
            <WorkerRoute>
              <MySubmissions />
            </WorkerRoute>
          }
        />

        <Route
          path="worker/withdrawals"
          element={
            <WorkerRoute>
              <Withdrawals />
            </WorkerRoute>
          }
        />

        <Route
          path="buyer/home"
          element={
            <BuyerRoute>
              <BuyerHome />
            </BuyerRoute>
          }
        />

        {/* Buyer payments */}
        <Route
          path="buyer/purchase-coin"
          element={
            <BuyerRoute>
              <PurchaseCoin />
            </BuyerRoute>
          }
        />
        <Route
          path="buyer/checkout"
          element={
            <BuyerRoute>
              <Checkout />
            </BuyerRoute>
          }
        />
        <Route
          path="buyer/payments"
          element={
            <BuyerRoute>
              <PaymentHistory />
            </BuyerRoute>
          }
        />
        <Route
          path="buyer/add-task"
          element={
            <BuyerRoute>
              <AddTask />
            </BuyerRoute>
          }
        />

        <Route
          path="buyer/my-tasks"
          element={
            <BuyerRoute>
              <MyTasks />
            </BuyerRoute>
          }
        />

        <Route
          path="admin/home"
          element={
            <AdminRoute>
              <AdminHome />
            </AdminRoute>
          }
        />
        <Route
          path="admin/withdraw-requests"
          element={
            <AdminRoute>
              <WithdrawRequests />
            </AdminRoute>
          }
        />
      </Route>
    </Routes>
  )
}
