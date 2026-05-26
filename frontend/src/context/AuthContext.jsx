import { createContext, useState, useCallback } from 'react';
import { authService } from '../services/auth.service';

export const AuthContext = createContext(null)


export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = useCallback(async (credentials) => {
    setLoading(true);
    try {
      const response = await authService.login(credentials);
      setUser(response.data.user);
      return response.data;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (data) => {
    setLoading(true);
    try {
      const response = await authService.register(data);
      setUser(response.data.user);
      return response.data;
    } finally {
      setLoading(false);
    }
  }, []);

  const registerOrganizer = useCallback(async (data) => {
    setLoading(true);
    try {
      const response = await authService.registerOrganizer(data);
      setUser(response.data.user);
      return response.data;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await authService.logout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProfilePhoto = useCallback(async (file) => {
    setLoading(true);
    try {
      const response = await authService.updateProfilePhoto(file);
      setUser(response.data.user);
      return response.data;
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, registerOrganizer, logout, updateProfilePhoto }}>
      {children}
    </AuthContext.Provider>
  )
}
