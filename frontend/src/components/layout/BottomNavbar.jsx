import { useContext, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Compass, Calendar, Ticket, User, Plus, ShieldAlert } from 'lucide-react'
import { AuthContext } from '../../context/AuthContext'
import Modal from '../common/Modal'

const NAV = [
  { icon: Compass,  label: 'Explore', path: '/' },
  { icon: Calendar, label: 'Events',  path: '/events' },
  { icon: null,     label: '',        path: null }, 
  { icon: Ticket,   label: 'My Tickets', path: '/my-registrations' },
  { icon: User,     label: 'Profile', path: '/profile' },
]

export default function BottomNavbar() {
  const navigate     = useNavigate()
  const { pathname } = useLocation()
  const { user }     = useContext(AuthContext)
  const [showModal, setShowModal] = useState(false)

  const handleAddEvent = () => {
    if (user?.role === 'admin') {
      navigate('/admin/events/create')
    } else {
      setShowModal(true)
    }
  }

  return (
    <>
      <nav className="bottom-nav" aria-label="Primary navigation">
        {NAV.map((item, i) => {
          if (!item.path) {
            return (
              <button
                key="fab"
                className="nav-plus"
                aria-label="Add event"
                onClick={handleAddEvent}
              >
                <Plus size={22} color="white" strokeWidth={2.5} />
              </button>
            )
          }
          const active = pathname === item.path
          const Icon   = item.icon
          return (
            <button
              key={i}
              className={`nav-item${active ? ' is-active' : ''}`}
              onClick={() => navigate(item.path)}
              aria-current={active ? 'page' : undefined}
            >
              <Icon size={22} color={active ? '#5b64ff' : '#aab0cc'} />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Modal for non-organizer users */}
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="Organizer Access Required"
        width={360}
      >
        <div style={{ textAlign: 'center', padding: '8px 0' }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: 'linear-gradient(135deg, #ffe0e0, #ffd6f0)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px'
          }}>
            <ShieldAlert size={30} color="#e05c7e" />
          </div>
          <p style={{ fontSize: 15, color: '#555', lineHeight: 1.6, marginBottom: 20 }}>
            Only <strong>registered organizers</strong> can create events.
            If you want to host events, please register as an <em>organizer</em> first.
          </p>
          <button
            onClick={() => { setShowModal(false); navigate('/register') }}
            style={{
              width: '100%', padding: '12px',
              background: 'linear-gradient(135deg, #5b64ff, #a259ff)',
              color: '#fff', border: 'none', borderRadius: 14,
              fontSize: 15, fontWeight: 700, cursor: 'pointer',
              letterSpacing: '0.3px'
            }}
          >
            Register as an Organizer
          </button>
          <button
            onClick={() => setShowModal(false)}
            style={{
              marginTop: 10, width: '100%', padding: '11px',
              background: 'transparent', color: '#aab0cc',
              border: '1.5px solid #eaeaf2', borderRadius: 14,
              fontSize: 14, fontWeight: 600, cursor: 'pointer'
            }}
          >
            Maybe Later
          </button>
        </div>
      </Modal>
    </>
  )
}
