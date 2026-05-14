import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import AdminSidebar        from '../../components/admin/AdminSidebar'
import ParticipantList     from '../../components/admin/ParticipantList'
import { registrationService } from '../../services/registration.service'
import { eventService }    from '../../services/event.service'

export default function Participants() {
  const { id }                   = useParams()
  const [event, setEvent]         = useState(null)
  const [participants, setParticipants] = useState([])
  const [loading, setLoading]    = useState(true)

  useEffect(() => {
    Promise.all([
      eventService.getById(id),
      registrationService.getParticipants(id),
    ])
      .then(([evRes, partRes]) => {
        setEvent(evRes.data.event)
        setParticipants(partRes.data.registrations || [])
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [id])

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <AdminSidebar />
      <main style={{ marginLeft: 240, flex: 1, padding: 32, background: 'var(--clr-bg)' }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Participants</h1>
        {event && (
          <p style={{ fontSize: 14, color: 'var(--clr-text-muted)', marginBottom: 24 }}>
            {event.title} — {participants.length} registered
          </p>
        )}
        <div style={{ background: '#fff', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-card)', overflow: 'hidden' }}>
          <ParticipantList participants={participants} loading={loading} />
        </div>
      </main>
    </div>
  )
}
