import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Calendar, MapPin, X } from 'lucide-react'
import { formatDate, formatPrice } from '../../utils/helpers'
import Loader from '../../components/common/Loader'

export default function MyRegistrations() {
  const navigate = useNavigate()

  const registrations = []
  const loading = false

  return (
    <div style={{ minHeight: '100vh', background: 'var(--clr-bg)' }}>
      <header style={{
        background: 'linear-gradient(135deg,var(--clr-primary),var(--clr-primary-dark))',
        padding: '20px 24px 32px', display: 'flex', alignItems: 'center', gap: 16
      }}>
        <button onClick={() => navigate(-1)} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', width: 40, height: 40, borderRadius: 12, display: 'grid', placeItems: 'center', cursor: 'pointer' }}>
          <ArrowLeft size={20} color="#fff" />
        </button>
        <h1 style={{ color: '#fff', fontSize: 18, fontWeight: 800 }}>My Registrations</h1>
      </header>

      <div style={{ padding: 24, marginTop: -12 }}>
        {loading
          ? <Loader />
          : registrations.length === 0
            ? (
              <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--clr-text-muted)' }}>
                <Calendar size={48} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
                <p style={{ fontSize: 16, fontWeight: 600 }}>No registrations yet</p>
                <p style={{ fontSize: 14, marginTop: 4 }}>Browse events and register to see them here</p>
                <button
                  onClick={() => navigate('/')}
                  style={{ marginTop: 20, background: 'var(--clr-primary)', color: '#fff', border: 'none', borderRadius: 12, padding: '12px 24px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Browse Events
                </button>
              </div>
            )
            : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {registrations.map((reg) => (
                  <div key={reg._id} style={{ background: '#fff', borderRadius: 'var(--radius-lg)', padding: '16px', boxShadow: 'var(--shadow-card)', display: 'flex', gap: 14 }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--clr-text)', margin: '0 0 8px' }}>{reg.event?.title}</h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <span style={{ fontSize: 13, color: 'var(--clr-text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
                          <Calendar size={13} /> {formatDate(reg.event?.date)}
                        </span>
                        <span style={{ fontSize: 13, color: 'var(--clr-text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
                          <MapPin size={13} /> {reg.event?.location}
                        </span>
                      </div>
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 'var(--radius-full)', background: '#e6faf3', color: 'var(--clr-success)', alignSelf: 'flex-start' }}>
                      Confirmed
                    </span>
                  </div>
                ))}
              </div>
            )
        }
      </div>
    </div>
  )
}
