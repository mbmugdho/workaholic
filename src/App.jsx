import { Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import DashboardLayout from './layouts/DashboardLayout'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import DashboardEntry from './pages/dashboard/DashboardEntry'

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardEntry />} />
      </Route>
    </Routes>
  )
}
