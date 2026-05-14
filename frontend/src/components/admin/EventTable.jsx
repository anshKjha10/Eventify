import { useNavigate } from 'react-router-dom'
import { Edit2, Trash2, Users } from 'lucide-react'
import { formatDate, formatPrice } from '../../utils/helpers'

/**
 * EventTable — admin table of all events.
 * Props: events (array), onDelete (fn), loading
 */
export default function EventTable({ events = [], onDelete, loading = false }) {
  const navigate = useNavigate()

  if (loading) return <p style={{ color: 'var(--clr-text-muted)', padding: 24 }}>Loading events…</p>
  if (!events.length) return <p style={{ color: 'var(--clr-text-muted)', padding: 24 }}>No events found.</p>

  return (
    <div className="evt-table-wrap">
      <table className="evt-table">
        <thead>
          <tr>
            <th>Event</th>
            <th>Category</th>
            <th>Date</th>
            <th>Price</th>
            <th>Attendees</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((ev) => (
            <tr key={ev._id}>
              <td className="evt-table__title">{ev.title}</td>
              <td><span className="evt-table__tag">{ev.category}</span></td>
              <td>{formatDate(ev.date)}</td>
              <td>{formatPrice(ev.price)}</td>
              <td>
                <span className="evt-table__att">
                  <Users size={13} /> {ev.attendees?.length ?? 0}
                </span>
              </td>
              <td>
                <div className="evt-table__actions">
                  <button
                    className="evt-table__btn evt-table__btn--edit"
                    onClick={() => navigate(`/admin/events/${ev._id}/edit`)}
                    aria-label="Edit"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    className="evt-table__btn evt-table__btn--del"
                    onClick={() => onDelete?.(ev._id)}
                    aria-label="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <style>{`
        .evt-table-wrap { overflow-x: auto; border-radius: var(--radius-lg); box-shadow: var(--shadow-card); }
        .evt-table { width: 100%; border-collapse: collapse; background: #fff; font-size: 14px; }
        .evt-table th {
          padding: 14px 16px; text-align: left; font-size: 12px; font-weight: 700;
          color: var(--clr-text-muted); text-transform: uppercase; letter-spacing: 0.5px;
          background: #fafafa; border-bottom: 1px solid var(--clr-border);
        }
        .evt-table td { padding: 14px 16px; border-bottom: 1px solid var(--clr-border); color: var(--clr-text); }
        .evt-table tr:last-child td { border-bottom: none; }
        .evt-table tr:hover td { background: #fafafa; }
        .evt-table__title { font-weight: 700; }
        .evt-table__tag {
          background: #eef0ff; color: var(--clr-primary); font-size: 11px;
          font-weight: 700; padding: 3px 10px; border-radius: var(--radius-full);
        }
        .evt-table__att { display: flex; align-items: center; gap: 5px; color: var(--clr-text-muted); }
        .evt-table__actions { display: flex; gap: 6px; }
        .evt-table__btn {
          width: 30px; height: 30px; border: none; border-radius: 8px;
          display: grid; place-items: center; cursor: pointer; transition: background 0.18s;
        }
        .evt-table__btn--edit { background: #eef0ff; color: var(--clr-primary); }
        .evt-table__btn--edit:hover { background: #d8dcff; }
        .evt-table__btn--del  { background: #fff0f0; color: var(--clr-danger); }
        .evt-table__btn--del:hover  { background: #ffd6d6; }
      `}</style>
    </div>
  )
}
