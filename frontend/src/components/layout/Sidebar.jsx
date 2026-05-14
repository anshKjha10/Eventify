import { useNavigate } from 'react-router-dom'
import {
  X, User, MessageCircle, Bookmark, Mail, Settings, LogOut
} from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

/**
 * Sidebar drawer that slides in from the left.
 * Props: open, onClose
 */
export default function Sidebar({ open, onClose }) {
  const navigate   = useNavigate()
  const { user, logout } = useAuth()

  const go = (path) => { onClose(); navigate(path) }

  const handleLogout = async () => {
    await logout()
    onClose()
    navigate('/auth/login')
  }

  const ITEMS = [
    { icon: User,          label: 'My Profile',  action: () => go('/profile') },
    { icon: MessageCircle, label: 'Messages',     action: () => go('/messages') },
    { icon: Bookmark,      label: 'Bookmark',     action: () => go('/saved') },
    { icon: Mail,          label: 'Contact Us',   action: () => go('/contact') },
    { icon: Settings,      label: 'Settings',     action: () => go('/settings') },
  ]

  return (
    <>
      {/* Overlay */}
      <div
        className={`drawer-overlay${open ? ' drawer-overlay--open' : ''}`}
        onClick={onClose}
      />

      {/* Drawer panel */}
      <aside
        className={`side-drawer${open ? ' side-drawer--open' : ''}`}
        aria-label="Navigation drawer"
        aria-hidden={!open}
      >
        <button className="drawer-close" onClick={onClose} aria-label="Close menu">
          <X size={22} color="#1a1822" />
        </button>

        {/* Profile */}
        <div className="drawer-profile">
          <div className="drawer-avatar-wrap" />
          <div className="drawer-user-info">
            <span className="drawer-name">{user?.name || 'Guest'}</span>
            <span className="drawer-sub" onClick={() => go('/profile')}>View Profile</span>
          </div>
        </div>

        {/* Nav items */}
        <nav className="drawer-nav">
          {ITEMS.map(({ icon: Icon, label, action }) => (
            <button key={label} className="drawer-item" onClick={action}>
              <Icon size={20} color="#5b64ff" />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="drawer-footer">
          <button className="drawer-item drawer-signout" onClick={handleLogout}>
            <LogOut size={20} color="#ff5c5c" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  )
}
