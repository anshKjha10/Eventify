import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ArrowLeft, MapPin, Calendar, Clock, Users, Bookmark, Share2 } from 'lucide-react'
import { formatDate, formatLocation, formatTime, formatPrice, getImageUrl } from '../../utils/helpers'
import Button from '../../components/common/Button'
import { eventService } from '../../services/event.service'
import { registrationService } from '../../services/registration.service'

export default function EventDetails() {
  const { id }   = useParams()
  const navigate = useNavigate()

  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)
  const [error, setError] = useState('')
  const [isRegistered, setIsRegistered] = useState(false)

  useEffect(() => {
    let active = true
    const load = async () => {
      setLoading(true)
      setError('')
      try {
        const [eventRes, regRes] = await Promise.all([
          eventService.getById(id),
          registrationService.getMyRegistrations()
        ])
        if(!active) return

        const fetched = eventRes.data?.event || eventRes.data
        setEvent(fetched)

        const regs = regRes.data?.registrations || []
        const registered = regs.some(r => r.event?._id === id)
        setIsRegistered(registered)
      } catch (err) {
        if(!active) return
        setError(err?.response?.data?.message || 'Failed to load event details.')
      } finally {
        if(active) setLoading(false)
      }
    }

    load()
    return () => {active = false}
  }, [id])

  const handleRegister = async () => {
    if(!event) return
    setActionLoading(true)
    setError('')
    try {
      await registrationService.register(id)
      setIsRegistered(true)
      setEvent((prev) => prev ? { ...prev, availableSeats: Math.max((prev.availableSeats || 0) - 1, 0) } : prev)
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to register for event.')
    } finally {
      setActionLoading(false)
    }
  }

  const handleCancel = async () => {
    if (!event) return
    setActionLoading(true)
    setError('')
    try {
      await registrationService.cancel(id)
      setIsRegistered(false)
      setEvent((prev) => prev ? { ...prev, availableSeats: (prev.availableSeats || 0) + 1 } : prev)
    } catch (err) {
      setError(err?.response?.data?.message || 'Cancel failed.')
    } finally {
      setActionLoading(false)
    }
  }

  if (loading) return <p style={{ padding: 32, color: 'var(--clr-text-muted)' }}>Loading…</p>
  if (!event) return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ color: 'var(--clr-text-muted)', marginBottom: 16 }}>Event not found.</p>
        <Button onClick={() => navigate(-1)} variant="ghost">Go Back</Button>
      </div>
    </div>
  )

  const priceValue = event.prize ?? event.price ?? 0
  const isFull = (event.availableSeats ?? 0) <= 0

  return (
    <div className="ed-page">
      <div className="ed-banner">
        <div className="ed-banner-actions">
          <button className="ed-back" onClick={() => navigate(-1)}><ArrowLeft size={20} color="#fff" /></button>
          <div className="ed-action-group">
            <button className="ed-icon-btn"><Bookmark size={18} color="#fff" /></button>
            <button className="ed-icon-btn"><Share2 size={18} color="#fff" /></button>
          </div>
        </div>
        {event.image && (
          <img
            className="ed-banner-img"
            src={getImageUrl(event.image)}
            alt={event.title}
          />
        )}
      </div>

      <div className="ed-content">
        <div className="ed-meta-row">
          <span className="ed-category">{event.category}</span>
          <span className="ed-price">{formatPrice(priceValue)}</span>
        </div>
        <h1 className="ed-title">{event.title}</h1>

        <div className="ed-info-list">
          <div className="ed-info-item"><Calendar size={16} color="var(--clr-primary)" /><span>{formatDate(event.date)}</span></div>
          <div className="ed-info-item"><Clock size={16} color="var(--clr-primary)" /><span>{formatTime(event.date)}</span></div>
          <div className="ed-info-item"><MapPin size={16} color="var(--clr-primary)" /><span>{formatLocation(event.location)}</span></div>
          <div className="ed-info-item"><Users size={16} color="var(--clr-primary)" /><span>{event.availableSeats ?? 0} seats left</span></div>
        </div>

        {error && (
          <div style={{ background: '#fff0f0', border: '1px solid #ffd6d6', color: '#c94b4b', padding: 12, borderRadius: 10, marginBottom: 16, fontSize: 14 }}>
            {error}
          </div>
        )}

        <div className="ed-section">
          <h2>About Event</h2>
          <p>{event.description || 'No description provided.'}</p>
        </div>
      </div>

      <div className="ed-footer">
        <div className="ed-price-block">
          <span className="ed-price-label">Price</span>
          <span className="ed-price-val">{formatPrice(priceValue)} / person</span>
        </div>
        {isRegistered ? (
          <Button variant="secondary" loading={actionLoading} onClick={handleCancel}>
            Cancel Registration
          </Button>
        ) : (
          <Button loading={actionLoading} disabled={isFull} onClick={handleRegister}>
            {isFull ? 'Event Full' : 'Register'}
          </Button>
        )}
      </div>

      <style>{`
        .ed-page { min-height: 100vh; background: var(--clr-bg); display: flex; flex-direction: column; }
        .ed-banner { height: clamp(220px, 38vw, 420px); background: var(--clr-primary); position: relative; overflow: hidden; }
        .ed-banner-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center; display: block; z-index: 0; }
        .ed-banner::after { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,0.35), rgba(0,0,0,0) 55%); z-index: 1; }
        .ed-banner-actions { position: absolute; top: 14px; left: 14px; right: 14px; display: flex; align-items: center; justify-content: space-between; z-index: 2; }
        .ed-action-group { display: flex; gap: 10px; }
        .ed-back, .ed-icon-btn { width: 40px; height: 40px; border-radius: 12px; border: none; background: rgba(255,255,255,0.22); display: grid; place-items: center; cursor: pointer; }
        .ed-content { flex: 1; padding: 24px; width: 100%; max-width: 960px; margin: 0 auto; }
        .ed-meta-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
        .ed-category { background: #eef0ff; color: var(--clr-primary); font-size: 12px; font-weight: 700; padding: 5px 14px; border-radius: var(--radius-full); }
        .ed-price { font-size: 20px; font-weight: 800; color: var(--clr-primary); }
        .ed-title { font-size: 22px; font-weight: 800; color: var(--clr-text); margin-bottom: 20px; line-height: 1.3; }
        .ed-info-list { display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px; }
        .ed-info-item { display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--clr-text-muted); }
        .ed-section { margin-bottom: 24px; }
        .ed-section h2 { font-size: 17px; font-weight: 800; color: var(--clr-text); margin-bottom: 10px; }
        .ed-section p { font-size: 14px; color: var(--clr-text-muted); line-height: 1.7; }
        .ed-footer { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 16px 24px 32px; background: #fff; border-top: 1px solid var(--clr-border); width: 100%; max-width: 960px; margin: 0 auto; }
        .ed-price-label { font-size: 12px; color: var(--clr-text-muted); display: block; }
        .ed-price-val { font-size: 20px; font-weight: 800; color: var(--clr-text); }

        @media (max-width: 600px) {
          .ed-footer { flex-direction: column; align-items: stretch; }
          .ed-footer .btn { width: 100%; }
        }

        @media (min-width: 900px) {
          .ed-content { padding: 32px 40px; }
          .ed-footer { padding: 20px 40px 32px; border-radius: 0 0 20px 20px; }
        }
      `}</style>
    </div>
  )
}