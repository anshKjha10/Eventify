// Registration service — stubbed (no backend connection)
// Replace with real API calls when backend is ready

export const registrationService = {
  register:           async (eventId)        => ({ data: {} }),
  cancel:             async (registrationId) => ({ data: {} }),
  getMyRegistrations: async ()               => ({ data: { registrations: [] } }),
  getParticipants:    async (eventId)        => ({ data: { registrations: [] } }),
}
