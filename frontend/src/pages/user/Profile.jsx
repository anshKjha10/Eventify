import { useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, Mail, Bell, Bookmark, Settings, LogOut } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { getInitials } from '../../utils/helpers'

export default function Profile() {
  const navigate         = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    await logout()
    navigate('/auth/login')
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--clr-bg)' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg,var(--clr-primary),var(--clr-primary-dark))',
        padding: '20px 24px 80px', display: 'flex', alignItems: 'center', gap: 16
      }}>
        <button onClick={() => navigate(-1)} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', width: 40, height: 40, borderRadius: 12, display: 'grid', placeItems: 'center', cursor: 'pointer' }}>
          <ArrowLeft size={20} color="#fff" />
        </button>
        <h1 style={{ flex: 1, color: '#fff', fontSize: 18, fontWeight: 800, textAlign: 'center' }}>My Profile</h1>
        <button style={{ background: 'rgba(255,255,255,0.2)', border: 'none', width: 40, height: 40, borderRadius: 12, display: 'grid', placeItems: 'center', cursor: 'pointer' }}>
          <Settings size={20} color="#fff" />
        </button>
      </div>

      {/* Identity card */}
      <div style={{ background: '#fff', borderRadius: '22px 22px 0 0', marginTop: -36, padding: '0 24px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        {/* Avatar placeholder */}
        <div style={{ width: 90, height: 90, borderRadius: '50%', background: 'var(--clr-border)', border: '4px solid #fff', marginTop: -45, boxShadow: '0 4px 16px rgba(0,0,0,0.12)', overflow: 'hidden' }} />
        <span style={{ fontSize: 20, fontWeight: 800, color: 'var(--clr-text)', marginTop: 8 }}>{user?.name || 'User'}</span>
        <span style={{ fontSize: 13, color: 'var(--clr-text-muted)' }}>{user?.email}</span>

        {/* Stats */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginTop: 18, paddingTop: 18, borderTop: '1px solid var(--clr-border)', width: '100%', justifyContent: 'center' }}>
          {[['Events', 12], ['Following', 48], ['Followers', 120]].map(([lbl, val], i, arr) => (
            <>
              <div key={lbl} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <span style={{ fontSize: 20, fontWeight: 800 }}>{val}</span>
                <span style={{ fontSize: 12, color: 'var(--clr-text-muted)' }}>{lbl}</span>
              </div>
              {i < arr.length - 1 && <div style={{ width: 1, height: 36, background: 'var(--clr-border)' }} />}
            </>
          ))}
        </div>
      </div>

      {/* Menu */}
      <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--clr-text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 4 }}>Account</p>
        <div style={{ background: '#fff', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-card)' }}>
          {[
            { icon: Bookmark, label: 'Saved Events', path: '/saved' },
            { icon: Bell,     label: 'Notifications', path: '/notifications' },
            { icon: Mail,     label: 'Contact Us',    path: '/contact' },
            { icon: MapPin,   label: 'My Location',   path: '/location' },
          ].map(({ icon: Icon, label, path }) => (
            <button key={path} onClick={() => navigate(path)} style={{ display: 'flex', alignItems: 'center', gap: 14, width: '100%', padding: '16px 20px', border: 'none', borderBottom: '1px solid var(--clr-border)', background: 'none', cursor: 'pointer', fontSize: 15, fontWeight: 600, color: 'var(--clr-text)' }}>
              <Icon size={18} color="var(--clr-primary)" />
              <span style={{ flex: 1, textAlign: 'left' }}>{label}</span>
              <span style={{ fontSize: 18, color: 'var(--clr-text-muted)' }}>›</span>
            </button>
          ))}
        </div>

        <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: 14, border: '1.5px solid #ffe0e0', borderRadius: 'var(--radius-md)', background: '#fff5f5', color: '#ff5c5c', fontSize: 15, fontWeight: 700, cursor: 'pointer', marginTop: 8 }}>
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </div>
  )
}
