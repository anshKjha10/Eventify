import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { PageLoader } from './Loader'

/**
 * ProtectedRoute — wraps routes that require authentication.
 *
 * Props:
 *  children   — the route content
 *  roles      — optional array of allowed roles e.g. ['admin']
 *  redirectTo — where to redirect if unauthenticated (default: /auth/login)
 */
export default function ProtectedRoute({ children, roles = [], redirectTo = '/auth/login' }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <PageLoader />

  if (!user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />
  }

  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />
  }

  return children
}
