import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

/**
 * Custom hook to access auth context.
 *
 * @returns {{ user, loading, login, register, registerOrganizer, logout }}
 */
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
