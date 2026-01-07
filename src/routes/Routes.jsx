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
          path="admin/home"
          element={
            <AdminRoute>
              <AdminHome />
            </AdminRoute>
          }
        />
      </Route>
    </Routes>
  )
}
