import { useNavigate, useLocation } from 'react-router-dom'
import { Compass, Calendar, Map, User, Plus } from 'lucide-react'

const NAV = [
  { icon: Compass,  label: 'Explore', path: '/' },
  { icon: Calendar, label: 'Events',  path: '/events' },
  { icon: null,     label: '',        path: null }, // FAB placeholder
  { icon: Map,      label: 'Map',     path: '/map' },
  { icon: User,     label: 'Profile', path: '/profile' },
]

export default function BottomNavbar() {
  const navigate  = useNavigate()
  const { pathname } = useLocation()

  return (
    <nav className="bottom-nav" aria-label="Primary navigation">
      {NAV.map((item, i) => {
        if (!item.path) {
          return (
            <button
              key="fab"
              className="nav-plus"
              aria-label="Add event"
              onClick={() => navigate('/admin/events/create')}
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
  )
}
