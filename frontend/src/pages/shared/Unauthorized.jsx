import { useNavigate } from 'react-router-dom'
import { ShieldOff } from 'lucide-react'

export default function Unauthorized() {
  const navigate = useNavigate()
  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: 'var(--clr-bg)', padding: 24 }}>
      <div style={{ textAlign: 'center', maxWidth: 360 }}>
        <ShieldOff size={64} color="var(--clr-danger)" style={{ margin: '0 auto 20px', opacity: 0.5 }} />
        <h1 style={{ fontSize: 72, fontWeight: 800, color: 'var(--clr-danger)', lineHeight: 1 }}>403</h1>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--clr-text)', margin: '12px 0 8px' }}>Access Denied</h2>
        <p style={{ fontSize: 14, color: 'var(--clr-text-muted)', lineHeight: 1.6, marginBottom: 28 }}>
          You don't have permission to view this page.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button
            onClick={() => navigate(-1)}
            style={{ padding: '13px 24px', background: '#fff', color: 'var(--clr-text)', border: '1.5px solid var(--clr-border)', borderRadius: 'var(--radius-md)', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}
          >
            Go Back
          </button>
          <button
            onClick={() => navigate('/')}
            style={{ padding: '13px 24px', background: 'linear-gradient(135deg,var(--clr-primary),var(--clr-primary-dark))', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}
          >
            Home
          </button>
        </div>
      </div>
    </div>
  )
}
