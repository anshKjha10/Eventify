import { useState, useEffect } from 'react'
import AdminSidebar       from '../../components/admin/AdminSidebar'
import EventTable         from '../../components/admin/EventTable'
import CreateEventModal   from '../../components/admin/CreateEventModal'
import EditEventModal     from '../../components/admin/EditEventModal'
import { eventService }   from '../../services/event.service'
import { Plus }           from 'lucide-react'

export default function ManageEvents() {
  const [events, setEvents]           = useState([])
  const [loading, setLoading]         = useState(true)
  const [createOpen, setCreateOpen]   = useState(false)
  const [editTarget, setEditTarget]   = useState(null)

  const fetchEvents = () => {
    setLoading(true)
    eventService.getAll()
      .then(({ data }) => setEvents(data.events || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchEvents() }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this event?')) return
    await eventService.remove(id)
    setEvents((prev) => prev.filter((e) => e._id !== id))
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <AdminSidebar />

      <main style={{ marginLeft: 240, flex: 1, padding: 32, background: 'var(--clr-bg)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--clr-text)' }}>Manage Events</h1>
          <button
            onClick={() => setCreateOpen(true)}
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '11px 18px', border: 'none', borderRadius: 'var(--radius-md)', background: 'var(--clr-primary)', color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}
          >
            <Plus size={16} /> Create Event
          </button>
        </div>

        <EventTable
          events={events}
          loading={loading}
          onDelete={handleDelete}
        />
      </main>

      <CreateEventModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreated={(ev) => { setEvents((prev) => [ev, ...prev]); setCreateOpen(false) }}
      />

      <EditEventModal
        open={!!editTarget}
        event={editTarget}
        onClose={() => setEditTarget(null)}
        onUpdated={(updated) => {
          setEvents((prev) => prev.map((e) => e._id === updated._id ? updated : e))
          setEditTarget(null)
        }}
      />
    </div>
  )
}
