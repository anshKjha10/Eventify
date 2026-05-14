// Event service — stubbed (no backend connection)
// Replace with real API calls when backend is ready

export const eventService = {
  getAll:    async (params) => ({ data: { events: [] } }),
  getById:   async (id)     => ({ data: { event: null } }),
  getNearby: async ()       => ({ data: { events: [] } }),
  create:    async (data)   => ({ data: { event: {} } }),
  update:    async (id, data) => ({ data: { event: {} } }),
  remove:    async (id)     => ({ data: {} }),
}
