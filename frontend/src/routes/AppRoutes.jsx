import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Auth
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

        {/* User */}
        <Route path="/"                 element={<Home />} />
        <Route path="/events/:id"       element={<EventDetails />} />
        <Route path="/my-registrations" element={<MyRegistrations />} />
        <Route path="/profile"          element={<Profile />} />

        {/* Admin */}
        <Route path="/admin/dashboard"               element={<AdminDashboard />} />
        <Route path="/admin/events"                  element={<ManageEvents />} />
        <Route path="/admin/events/create"           element={<CreateEvent />} />
        <Route path="/admin/events/:id/edit"         element={<EditEvent />} />
        <Route path="/admin/events/:id/participants" element={<Participants />} />

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
