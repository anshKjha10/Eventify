import { Menu, Bell, ChevronDown } from 'lucide-react'

/**
 * MobileNavbar — top bar inside the hero header.
 * Props: onMenuClick, city
 */
export default function MobileNavbar({ onMenuClick, city = 'New York, USA' }) {
  return (
    <div className="hero-topbar">
      <button className="icon-btn" aria-label="Open menu" onClick={onMenuClick}>
        <Menu size={22} color="white" />
      </button>

      <div className="location">
        <span className="eyebrow">
          Current Location{' '}
          <ChevronDown size={12} color="white" style={{ display: 'inline', verticalAlign: 'middle' }} />
        </span>
        <span className="city">{city}</span>
      </div>

      <button className="icon-btn notif-btn" aria-label="Notifications">
        <Bell size={20} color="white" />
      </button>
    </div>
  )
}
