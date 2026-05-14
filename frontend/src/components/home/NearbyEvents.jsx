import EventCard from './EventCard'

/**
 * NearbyEvents — grid/scroll of events near the user.
 * Props: events (array), loading
 */
export default function NearbyEvents({ events = [], loading = false }) {
  return (
    <section style={{ marginTop: 8 }}>
      <div className="section-header">
        <h2 className="section-title">Nearby You</h2>
        <button className="see-all-btn">See All <span>›</span></button>
      </div>

      <div className="cards-scroll">
        {loading
          ? Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="event-card card-sky" style={{ minHeight: 240 }}>
                <div style={{ background: '#cce8fa', borderRadius: 16, height: '100%', animation: 'pulse 1.5s infinite' }} />
              </div>
            ))
          : events.length === 0
            ? <p style={{ color: 'var(--clr-text-muted)', fontSize: 14 }}>No events nearby.</p>
            : events.map((ev, i) => (
                <EventCard key={ev._id || i} event={ev} colorClass={i % 2 === 0 ? 'card-sky' : 'card-peach'} />
              ))}
      </div>

      <style>{`@keyframes pulse { 0%,100%{opacity:1}50%{opacity:.5} }`}</style>
    </section>
  )
}
