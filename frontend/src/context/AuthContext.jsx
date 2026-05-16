import { createContext, useState, useCallback } from 'react'

export const AuthContext = createContext(null)

// Stub user — no API calls while backend is disconnected
const STUB_USER = { name: 'Ashfak Sayem', email: 'ashfak@example.com', phoneNumber: '555-0100', role: 'admin' }

export function AuthProvider({ children }) {
  const [user, setUser] = useState(STUB_USER)

  const login    = useCallback(async () => user,    [user])
  const register = useCallback(async () => user,    [user])
  const logout   = useCallback(async () => setUser(null), [])

  return (
    <AuthContext.Provider value={{ user, loading: false, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
