import { Menu } from 'lucide-react'

/**
 * MobileMenu — a standalone hamburger trigger button.
 * Props: onClick
 */
export default function MobileMenu({ onClick }) {
  return (
    <button className="icon-btn" aria-label="Open menu" onClick={onClick}>
      <Menu size={22} color="white" />
    </button>
  )
}
