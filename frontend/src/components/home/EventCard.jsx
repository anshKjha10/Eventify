import { useNavigate } from 'react-router-dom'
import { MapPin, Bookmark } from 'lucide-react'
import { formatDate, formatLocation, getImageUrl, truncate } from '../../utils/helpers'

/**
 * EventCard — a single event card.
 * Props: event, colorClass
 */
export default function EventCard({ event = {}, colorClass = 'card-peach' }) {
  const navigate = useNavigate()
  const {
    _id, title, date, location,
    attendees = [], image,
  } = event

  const day   = date ? new Date(date).getDate() : '—'
  const month = date ? new Date(date).toLocaleString('en-US', { month: 'short' }).toUpperCase() : '—'

  return (
    <article
      className={`event-card ${colorClass}`}
      onClick={() => navigate(`/events/${_id}`)}
      style={{ cursor: 'pointer' }}
    >
      <div className="card-top">
        <div className="date-badge">
          <span className="date-day">{day}</span>
          <span className="date-month">{month}</span>
        </div>
        <button
          className="bookmark-btn"
          aria-label="Save event"
          onClick={(e) => e.stopPropagation()}
        >
          <Bookmark size={18} fill="#ff6b5d" color="#ff6b5d" />
        </button>
      </div>

      {/* Banner image — empty until user adds one */}
      <div className="card-art">
        {image && (
          <img src={getImageUrl(image)} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
        )}
      </div>

      <div className="card-body">
        <h3 title={title}>{truncate(title || 'Untitled Event', 22)}</h3>
        <div className="attendees">
          <div className="avatars">
            {(attendees.slice(0, 3)).map((a, i) => (
              <span key={i} className="avatar" style={{ background: ['#ffb3a3','#a3d4ff','#b3e0c8'][i] }}>
                {(a.name?.[0] || '?').toUpperCase()}
              </span>
            ))}
          </div>
          {attendees.length > 0 && (
            <span className="going">+{attendees.length} Going</span>
          )}
        </div>
        <div className="meta">
          <MapPin size={12} color="#8b90a5" />
          <span>{truncate(formatLocation(location), 24)}</span>
        </div>
      </div>
    </article>
  )
}
