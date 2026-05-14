// Auth service — stubbed (no backend connection)
// Replace with real API calls when backend is ready

export const authService = {
  login:    async (credentials) => ({ data: {} }),
  register: async (data)        => ({ data: {} }),
  getMe:    async ()            => ({ data: {} }),
  logout:   async ()            => {},
}
