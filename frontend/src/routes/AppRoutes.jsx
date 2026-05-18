import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from '../components/common/ProtectedRoute'

import Login    from '../pages/auth/Login'
import Register from '../pages/auth/Register'

// User
import Home             from '../pages/user/Home'
import EventDetails     from '../pages/user/EventDetails'
import MyRegistrations  from '../pages/user/MyRegistrations'
import Profile          from '../pages/user/Profile'

// Admin
import AdminDashboard from '../pages/admin/Dashboard'
import ManageEvents   from '../pages/admin/ManageEvents'
import CreateEvent    from '../pages/admin/CreateEvent'
import EditEvent      from '../pages/admin/EditEvent'
import Participants   from '../pages/admin/Participants'

// Shared
import NotFound     from '../pages/shared/NotFound'
import Unauthorized from '../pages/shared/Unauthorized'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/auth/login"    element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/unauthorized"  element={<Unauthorized />} />

        {/* User (protected) */}
        <Route
          path="/"
          element={
            <ProtectedRoute redirectTo="/auth/register">
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/events/:id"
          element={
            <ProtectedRoute redirectTo="/auth/register">
              <EventDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-registrations"
          element={
            <ProtectedRoute redirectTo="/auth/register">
              <MyRegistrations />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute redirectTo="/auth/register">
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Admin (protected) */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute redirectTo="/auth/register">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/events"
          element={
            <ProtectedRoute redirectTo="/auth/register">
              <ManageEvents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/events/create"
          element={
            <ProtectedRoute redirectTo="/auth/register">
              <CreateEvent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/events/:id/edit"
          element={
            <ProtectedRoute redirectTo="/auth/register">
              <EditEvent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/events/:id/participants"
          element={
            <ProtectedRoute redirectTo="/auth/register">
              <Participants />
            </ProtectedRoute>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}