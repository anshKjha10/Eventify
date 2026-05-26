import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, MapPin, Calendar, Clock, Users, Bookmark, Share2 } from 'lucide-react'
import { formatDate, formatLocation, formatTime, formatPrice, getImageUrl } from '../../utils/helpers'
import Button from '../../components/common/Button'

export default function EventDetails() {
  const { id }   = useParams()
  const navigate = useNavigate()

  // TODO: fetch event from eventService.getById(id)
  const event = null
  const loading = false

  if (loading) return <p style={{ padding: 32, color: 'var(--clr-text-muted)' }}>Loading…</p>
  if (!event)  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ color: 'var(--clr-text-muted)', marginBottom: 16 }}>Event not found.</p>
        <Button onClick={() => navigate(-1)} variant="ghost">Go Back</Button>
      </div>
    </div>
  )

  return (
    <div className="ed-page">
      <div className="ed-banner">
        <button className="ed-back" onClick={() => navigate(-1)}><ArrowLeft size={20} color="#fff" /></button>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="ed-icon-btn"><Bookmark size={18} color="#fff" /></button>
          <button className="ed-icon-btn"><Share2 size={18} color="#fff" /></button>
        </div>
        {event.image && <img src={getImageUrl(event.image)} alt={event.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: -1 }} />}
      </div>

      <div className="ed-content">
        <div className="ed-meta-row">
          <span className="ed-category">{event.category}</span>
          <span className="ed-price">{formatPrice(event.price)}</span>
        </div>
        <h1 className="ed-title">{event.title}</h1>

        <div className="ed-info-list">
          <div className="ed-info-item"><Calendar size={16} color="var(--clr-primary)" /><span>{formatDate(event.date)}</span></div>
          <div className="ed-info-item"><Clock    size={16} color="var(--clr-primary)" /><span>{formatTime(event.date)}</span></div>
          <div className="ed-info-item"><MapPin   size={16} color="var(--clr-primary)" /><span>{formatLocation(event.location)}</span></div>
          <div className="ed-info-item"><Users    size={16} color="var(--clr-primary)" /><span>+{event.attendees?.length ?? 0} going</span></div>
        </div>

        <div className="ed-section">
          <h2>About Event</h2>
          <p>{event.description || 'No description provided.'}</p>
        </div>
      </div>

      <div className="ed-footer">
        <div className="ed-price-block">
          <span className="ed-price-label">Price</span>
          <span className="ed-price-val">{formatPrice(event.price)} / person</span>
        </div>
        <Button>Book Now</Button>
      </div>

      <style>{`
        .ed-page { min-height: 100vh; background: var(--clr-bg); display: flex; flex-direction: column; }
        .ed-banner { height: 260px; background: var(--clr-primary); position: relative; display: flex; justify-content: space-between; align-items: flex-start; padding: 20px; overflow: hidden; }
        .ed-back, .ed-icon-btn { width: 40px; height: 40px; border-radius: 12px; border: none; background: rgba(255,255,255,0.22); display: grid; place-items: center; cursor: pointer; }
        .ed-content { flex: 1; padding: 24px; }
        .ed-meta-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
        .ed-category { background: #eef0ff; color: var(--clr-primary); font-size: 12px; font-weight: 700; padding: 5px 14px; border-radius: var(--radius-full); }
        .ed-price { font-size: 20px; font-weight: 800; color: var(--clr-primary); }
        .ed-title { font-size: 22px; font-weight: 800; color: var(--clr-text); margin-bottom: 20px; line-height: 1.3; }
        .ed-info-list { display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px; }
        .ed-info-item { display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--clr-text-muted); }
        .ed-section { margin-bottom: 24px; }
        .ed-section h2 { font-size: 17px; font-weight: 800; color: var(--clr-text); margin-bottom: 10px; }
        .ed-section p { font-size: 14px; color: var(--clr-text-muted); line-height: 1.7; }
        .ed-footer { display: flex; align-items: center; justify-content: space-between; padding: 16px 24px 32px; background: #fff; border-top: 1px solid var(--clr-border); }
        .ed-price-label { font-size: 12px; color: var(--clr-text-muted); display: block; }
        .ed-price-val { font-size: 20px; font-weight: 800; color: var(--clr-text); }
      `}</style>
    </div>
  )
}
