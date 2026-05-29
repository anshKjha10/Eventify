export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
export const API_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, '')

export const TOKEN_KEY = 'eventify_token'
export const USER_KEY  = 'eventify_user'

export const ROLES = {
  USER:    'user',
  ADMIN:   'admin',
  PARTNER: 'partner',
}

export const EVENT_CATEGORIES = ['All', 'Sports', 'Music', 'Food & Drink', 'Tech', 'Art', 'Networking']

export const NAV_LINKS = [
  { label: 'Explore',  path: '/' },
  { label: 'Events',   path: '/events' },
  { label: 'My Tickets', path: '/my-registrations' },
  { label: 'Profile',  path: '/profile' },
]
