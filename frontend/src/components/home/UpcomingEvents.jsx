import EventCard from './EventCard'

const COLORS = ['card-peach', 'card-sky', 'card-peach', 'card-sky']

/**
 * UpcomingEvents — horizontal scroll of EventCards.
 * Props: events (array), loading
 */
export default function UpcomingEvents({ events = [], loading = false }) {
  return (
    <section>
      <div className="section-header">
        <h2 className="section-title">Upcoming Events</h2>
        <button className="see-all-btn">See All <span>›</span></button>
      </div>

      <div className="cards-scroll">
        {loading
          ? Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="event-card card-peach" style={{ minHeight: 240 }}>
                <div style={{ background: '#ffe8df', borderRadius: 16, height: '100%', animation: 'pulse 1.5s infinite' }} />
              </div>
            ))
          : events.length === 0
            ? <p style={{ color: 'var(--clr-text-muted)', fontSize: 14 }}>No upcoming events.</p>
            : events.map((ev, i) => (
                <EventCard key={ev._id || i} event={ev} colorClass={COLORS[i % COLORS.length]} />
              ))}
      </div>

      <style>{`@keyframes pulse { 0%,100%{opacity:1}50%{opacity:.5} }`}</style>
    </section>
  )
}
