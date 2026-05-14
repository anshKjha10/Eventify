import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AdminSidebar    from '../../components/admin/AdminSidebar'
import { eventService } from '../../services/event.service'
import { EVENT_CATEGORIES } from '../../utils/constants'
import Button from '../../components/common/Button'
import Loader from '../../components/common/Loader'

export default function EditEvent() {
  const { id }   = useParams()
  const navigate = useNavigate()
  const [form, setForm]       = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving]   = useState(false)
  const [error, setError]     = useState('')

  useEffect(() => {
    eventService.getById(id)
      .then(({ data }) => setForm({ ...data.event, date: data.event.date?.slice(0, 16) || '' }))
      .catch(() => setError('Event not found'))
      .finally(() => setLoading(false))
  }, [id])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault(); setSaving(true); setError('')
    try {
      await eventService.update(id, form)
      navigate('/admin/events')
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed')
    } finally { setSaving(false) }
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <AdminSidebar />
      <main style={{ marginLeft: 240, flex: 1, padding: 32, background: 'var(--clr-bg)' }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 24 }}>Edit Event</h1>
        {loading ? <Loader /> : (
          <div style={{ background: '#fff', borderRadius: 'var(--radius-lg)', padding: 32, boxShadow: 'var(--shadow-card)', maxWidth: 640 }}>
            {error && <p style={{ color: 'var(--clr-danger)', marginBottom: 16, fontSize: 14 }}>{error}</p>}
            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
              {[
                { name: 'title',    label: 'Title',       type: 'text',           col: 'full' },
                { name: 'date',     label: 'Date & Time', type: 'datetime-local', col: '' },
                { name: 'price',    label: 'Price ($)',   type: 'number',         col: '' },
                { name: 'location', label: 'Location',    type: 'text',           col: 'full' },
              ].map(({ name, label, type, col }) => (
                <div key={name} style={{ gridColumn: col === 'full' ? '1/-1' : '', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: 13, fontWeight: 700 }}>{label}</label>
                  <input name={name} type={type} value={form[name] || ''} onChange={handleChange}
                    style={{ border: '1.5px solid var(--clr-border)', borderRadius: 10, padding: '11px 14px', fontSize: 14, outline: 'none', fontFamily: 'var(--font-body)' }} />
                </div>
              ))}
              <div style={{ gridColumn: '1/-1', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 700 }}>Category</label>
                <select name="category" value={form.category || ''} onChange={handleChange}
                  style={{ border: '1.5px solid var(--clr-border)', borderRadius: 10, padding: '11px 14px', fontSize: 14, outline: 'none', fontFamily: 'var(--font-body)' }}>
                  {EVENT_CATEGORIES.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div style={{ gridColumn: '1/-1', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 700 }}>Description</label>
                <textarea name="description" rows={4} value={form.description || ''} onChange={handleChange}
                  style={{ border: '1.5px solid var(--clr-border)', borderRadius: 10, padding: '11px 14px', fontSize: 14, outline: 'none', fontFamily: 'var(--font-body)', resize: 'vertical' }} />
              </div>
              <div style={{ gridColumn: '1/-1', display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                <Button variant="ghost" type="button" onClick={() => navigate(-1)}>Cancel</Button>
                <Button type="submit" loading={saving}>Save Changes</Button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  )
}
