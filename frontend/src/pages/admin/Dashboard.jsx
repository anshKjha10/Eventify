import { useState, useEffect } from 'react'
import AdminSidebar      from '../../components/admin/AdminSidebar'
import { eventService }  from '../../services/event.service'
import { registrationService } from '../../services/registration.service'
import { CalendarDays, Users, TrendingUp, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [stats, setStats] = useState({ events: 0, participants: 0 })

  useEffect(() => {
    eventService.getAll()
      .then(({ data }) => setStats((s) => ({ ...s, events: data.events?.length ?? 0 })))
      .catch(() => {})
  }, [])

  const CARDS = [
    { icon: CalendarDays, label: 'Total Events',   value: stats.events,       color: '#eef0ff', iconColor: 'var(--clr-primary)' },
    { icon: Users,        label: 'Participants',    value: stats.participants, color: '#e6faf3', iconColor: 'var(--clr-success)' },
    { icon: TrendingUp,   label: 'This Month',      value: '—',               color: '#fff8e6', iconColor: 'var(--clr-warning)' },
  ]

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <AdminSidebar />

      <main style={{ marginLeft: 240, flex: 1, padding: 32, background: 'var(--clr-bg)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: 'var(--clr-text)' }}>Dashboard</h1>
            <p style={{ fontSize: 14, color: 'var(--clr-text-muted)', marginTop: 4 }}>Welcome back, Admin</p>
          </div>
          <button
            onClick={() => navigate('/admin/events/create')}
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 20px', border: 'none', borderRadius: 'var(--radius-md)', background: 'var(--clr-primary)', color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}
          >
            <Plus size={18} /> New Event
          </button>
        </div>

        {/* Stat cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 20, marginBottom: 32 }}>
          {CARDS.map(({ icon: Icon, label, value, color, iconColor }) => (
            <div key={label} style={{ background: '#fff', borderRadius: 'var(--radius-lg)', padding: 24, boxShadow: 'var(--shadow-card)', display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: color, display: 'grid', placeItems: 'center' }}>
                <Icon size={22} color={iconColor} />
              </div>
              <div>
                <p style={{ fontSize: 26, fontWeight: 800, color: 'var(--clr-text)' }}>{value}</p>
                <p style={{ fontSize: 13, color: 'var(--clr-text-muted)' }}>{label}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 'var(--radius-lg)', padding: 24, boxShadow: 'var(--shadow-card)' }}>
          <h2 style={{ fontSize: 17, fontWeight: 800, marginBottom: 16 }}>Recent Activity</h2>
          <p style={{ color: 'var(--clr-text-muted)', fontSize: 14 }}>Activity feed will appear here once events are created.</p>
        </div>
      </main>
    </div>
  )
}
