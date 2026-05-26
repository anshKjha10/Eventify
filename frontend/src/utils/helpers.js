import { API_ORIGIN } from './constants'
/**
 * Format an ISO date string into a human-readable date.
 * @param {string} dateStr
 * @returns {string} e.g. "June 10, 2025"
 */
export const formatDate = (dateStr) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

/**
 * Format an ISO date string into time only.
 * @param {string} dateStr
 * @returns {string} e.g. "06:30 PM"
 */
export const formatTime = (dateStr) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit',
  })
}

/**
 * Format a number as currency.
 * @param {number} price
 * @returns {string} e.g. "$29.00" or "Free"
 */
export const formatPrice = (price) => {
  if (!price || price === 0) return 'Free'
  return `$${Number(price).toFixed(2)}`
}

/**
 * Truncate a string to n characters.
 */
export const truncate = (str = '', n = 40) =>
  str.length > n ? str.slice(0, n) + '…' : str

/**
 * Build a full image URL from an API-relative path.
 * @param {string} path
 * @returns {string}
 */
export const getImageUrl = (path = '') => {
  if (!path) return ''
  if (/^https?:\/\//i.test(path)) return path
  if (/^data:/i.test(path)) return path
  return path.startsWith('/') ? `${API_ORIGIN}${path}` : `${API_ORIGIN}/${path}`
}

/**
 * Format a location that may be an object or string.
 * @param {object|string} location
 * @returns {string}
 */
export const formatLocation = (location) => {
  if (!location) return 'TBA'
  if (typeof location === 'string') return location
  const parts = [location.city, location.address, location.country].filter(Boolean)
  return parts.length > 0 ? parts.join(', ') : 'TBA'
}

/**
 * Get initials from a full name.
 * @param {string} name
 * @returns {string} e.g. "AJ"
 */
export const getInitials = (name = '') =>
  name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()

/**
 * Check if the JWT stored in localStorage is expired.
 * @param {string} token
 * @returns {boolean}
 */
export const isTokenExpired = (token) => {
  if (!token) return true
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.exp * 1000 < Date.now()
  } catch {
    return true
  }
}
