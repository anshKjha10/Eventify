import { useState } from 'react'
import Modal  from '../common/Modal'
import Button from '../common/Button'
import { eventService } from '../../services/event.service'
import { EVENT_CATEGORIES } from '../../utils/constants'

/**
 * CreateEventModal — modal form for creating a new event.
 * Props: open, onClose, onCreated
 */
export default function CreateEventModal({ open, onClose, onCreated }) {
  const [form, setForm]       = useState({ title: '', category: '', date: '', location: '', price: '', description: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const { data } = await eventService.create(form)
      onCreated?.(data.event)
      onClose()
      setForm({ title: '', category: '', date: '', location: '', price: '', description: '' })
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create event')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Create New Event">
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {error && <p style={{ color: 'var(--clr-danger)', fontSize: 13 }}>{error}</p>}

        {[
          { name: 'title',       label: 'Event Title',    type: 'text',     required: true },
          { name: 'date',        label: 'Date & Time',    type: 'datetime-local', required: true },
          { name: 'location',    label: 'Location',       type: 'text',     required: true },
          { name: 'price',       label: 'Price ($)',      type: 'number' },
        ].map(({ name, label, type, required }) => (
          <div key={name} className="cef-field">
            <label>{label}</label>
            <input name={name} type={type} value={form[name]} onChange={handleChange} required={required} />
          </div>
        ))}

        <div className="cef-field">
          <label>Category</label>
          <select name="category" value={form.category} onChange={handleChange} required>
            <option value="">Select…</option>
            {EVENT_CATEGORIES.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="cef-field">
          <label>Description</label>
          <textarea name="description" rows={3} value={form.description} onChange={handleChange} />
        </div>

        <Button type="submit" loading={loading} fullWidth>Create Event</Button>
      </form>

      <style>{`
        .cef-field { display: flex; flex-direction: column; gap: 5px; }
        .cef-field label { font-size: 13px; font-weight: 700; color: var(--clr-text); }
        .cef-field input, .cef-field select, .cef-field textarea {
          border: 1.5px solid var(--clr-border); border-radius: var(--radius-sm);
          padding: 10px 12px; font-size: 14px; color: var(--clr-text);
          background: #fafafa; outline: none; font-family: var(--font-body);
          transition: border-color 0.2s;
        }
        .cef-field input:focus, .cef-field select:focus, .cef-field textarea:focus {
          border-color: var(--clr-primary); background: #fff;
        }
        .cef-field textarea { resize: vertical; }
      `}</style>
    </Modal>
  )
}
