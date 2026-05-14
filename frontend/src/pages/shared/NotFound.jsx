import { useNavigate } from 'react-router-dom'
import { SearchX } from 'lucide-react'

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: 'var(--clr-bg)', padding: 24 }}>
      <div style={{ textAlign: 'center', maxWidth: 360 }}>
        <SearchX size={64} color="var(--clr-primary)" style={{ margin: '0 auto 20px', opacity: 0.4 }} />
        <h1 style={{ fontSize: 72, fontWeight: 800, color: 'var(--clr-primary)', lineHeight: 1 }}>404</h1>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--clr-text)', margin: '12px 0 8px' }}>Page not found</h2>
        <p style={{ fontSize: 14, color: 'var(--clr-text-muted)', lineHeight: 1.6, marginBottom: 28 }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={() => navigate('/')}
          style={{ padding: '13px 28px', background: 'linear-gradient(135deg,var(--clr-primary),var(--clr-primary-dark))', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}
        >
          Back to Home
        </button>
      </div>
    </div>
  )
}
