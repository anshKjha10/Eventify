import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import EventCard from '../../components/home/EventCard'
import { eventService } from '../../services/event.service'

export default function AllEvents() {
    const navigate = useNavigate()
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await eventService.getAll()
                setEvents(res.data.events || []) 
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to load events')
            } finally {
                setLoading(false)
            }
        }

        fetchEvents()
    }, [])

    return (
    <div className="app">
      <main className="content">
        <div className="section-header">
          <h2 className="section-title">All Events</h2>
          <button className="see-all-btn" onClick={() => navigate(-1)}>
            Back <span>›</span>
          </button>
        </div>

        {loading && (
          <div className="cards-scroll">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="event-card card-sky" style={{ minHeight: 240 }}>
                <div style={{ background: '#cce8fa', borderRadius: 16, height: '100%', animation: 'pulse 1.5s infinite' }} />
              </div>
            ))}
          </div>
        )}

        {!loading && error && (
          <p style={{ color: 'var(--clr-danger)', fontSize: 14 }}>{error}</p>
        )}

        {!loading && !error && (
          <div className="cards-scroll" style={{ flexWrap: 'wrap', overflowX: 'visible' }}>
            {events.length === 0
              ? <p style={{ color: 'var(--clr-text-muted)', fontSize: 14 }}>No events found.</p>
              : events.map((ev, i) => (
                  <EventCard key={ev._id || i} event={ev} colorClass={i % 2 === 0 ? 'card-sky' : 'card-peach'} />
                ))}
          </div>
        )}

        <style>{`@keyframes pulse { 0%,100%{opacity:1}50%{opacity:.5} }`}</style>
      </main>
    </div>
  )
}