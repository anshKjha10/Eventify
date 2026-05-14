import { getInitials } from '../../utils/helpers'

const BG_COLORS = ['#ffb3a3', '#a3d4ff', '#b3e0c8', '#ffd6a3', '#c3b0ff', '#ffc3e8']

/**
 * ParticipantList — list of registered users for an event.
 * Props: participants (array), loading
 */
export default function ParticipantList({ participants = [], loading = false }) {
  if (loading) return <p style={{ color: 'var(--clr-text-muted)', fontSize: 14 }}>Loading participants…</p>
  if (!participants.length) return <p style={{ color: 'var(--clr-text-muted)', fontSize: 14 }}>No participants yet.</p>

  return (
    <div className="plist">
      {participants.map((p, i) => (
        <div key={p._id || i} className="plist__item">
          <span className="plist__avatar" style={{ background: BG_COLORS[i % BG_COLORS.length] }}>
            {getInitials(p.name || p.email || '?')}
          </span>
          <div className="plist__info">
            <span className="plist__name">{p.name || 'Unknown'}</span>
            <span className="plist__email">{p.email}</span>
          </div>
          <span className={`plist__status plist__status--${p.status || 'confirmed'}`}>
            {p.status || 'confirmed'}
          </span>
        </div>
      ))}

      <style>{`
        .plist { display: flex; flex-direction: column; gap: 2px; }
        .plist__item {
          display: flex; align-items: center; gap: 14px; padding: 12px 16px;
          background: #fff; border-radius: var(--radius-sm);
          border-bottom: 1px solid var(--clr-border);
        }
        .plist__item:last-child { border-bottom: none; }
        .plist__avatar {
          width: 38px; height: 38px; border-radius: 50%; display: grid;
          place-items: center; font-size: 12px; font-weight: 700; color: #fff; flex-shrink: 0;
        }
        .plist__info { flex: 1; }
        .plist__name  { display: block; font-size: 14px; font-weight: 700; color: var(--clr-text); }
        .plist__email { display: block; font-size: 12px; color: var(--clr-text-muted); }
        .plist__status {
          font-size: 11px; font-weight: 700; padding: 3px 10px;
          border-radius: var(--radius-full); text-transform: capitalize;
        }
        .plist__status--confirmed { background: #e6faf3; color: var(--clr-success); }
        .plist__status--pending   { background: #fff8e6; color: var(--clr-warning); }
        .plist__status--cancelled { background: #fff0f0; color: var(--clr-danger);  }
      `}</style>
    </div>
  )
}
