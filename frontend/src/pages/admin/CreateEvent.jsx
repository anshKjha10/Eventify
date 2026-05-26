import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ImagePlus, X } from 'lucide-react'
import AdminSidebar  from '../../components/admin/AdminSidebar'
import { eventService } from '../../services/event.service'
import { EVENT_CATEGORIES } from '../../utils/constants'
import Button from '../../components/common/Button'

const inputStyle = {
  border: '1.5px solid var(--clr-border)',
  borderRadius: 10,
  padding: '11px 14px',
  fontSize: 14,
  outline: 'none',
  fontFamily: 'var(--font-body)',
  width: '100%',
  boxSizing: 'border-box',
  background: '#fafafa',
  transition: 'border-color 0.2s',
}

const labelStyle = { fontSize: 13, fontWeight: 700, color: 'var(--clr-text)', marginBottom: 6, display: 'block' }

export default function CreateEvent() {
  const navigate = useNavigate()
  const fileRef  = useRef(null)

  const [form, setForm] = useState({
    title:       '',
    description: '',
    category:    '',
    date:        '',
    city:        '',
    country:     '',
    address:     '',
    prize:       '',
    maxSeats:    '',
  })
  const [imageFile,    setImageFile]    = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [loading,      setLoading]      = useState(false)
  const [error,        setError]        = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      await eventService.create({ ...form, image: imageFile })
      navigate('/admin/events')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create event')
    } finally { setLoading(false) }
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <AdminSidebar />
      <main style={{ marginLeft: 240, flex: 1, padding: 32, background: 'var(--clr-bg)' }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 24 }}>Create Event</h1>

        <div style={{ background: '#fff', borderRadius: 'var(--radius-lg)', padding: 32, boxShadow: 'var(--shadow-card)', maxWidth: 700 }}>
          {error && <p style={{ color: 'var(--clr-danger)', marginBottom: 16, fontSize: 14, fontWeight: 600 }}>{error}</p>}

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>

              {/* Title — full width */}
              <div style={{ gridColumn: '1/-1', display: 'flex', flexDirection: 'column' }}>
                <label style={labelStyle}>Title <span style={{ color: 'var(--clr-danger)' }}>*</span></label>
                <input name="title" type="text" value={form.title} onChange={handleChange} required style={inputStyle} placeholder="Event title" />
              </div>

              {/* Date */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={labelStyle}>Date & Time <span style={{ color: 'var(--clr-danger)' }}>*</span></label>
                <input name="date" type="datetime-local" value={form.date} onChange={handleChange} required style={inputStyle} />
              </div>

              {/* Category */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={labelStyle}>Category <span style={{ color: 'var(--clr-danger)' }}>*</span></label>
                <select name="category" value={form.category} onChange={handleChange} required style={inputStyle}>
                  <option value="">Select category…</option>
                  {EVENT_CATEGORIES.filter(c => c !== 'All').map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* City */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={labelStyle}>City <span style={{ color: 'var(--clr-danger)' }}>*</span></label>
                <input name="city" type="text" value={form.city} onChange={handleChange} required style={inputStyle} placeholder="e.g. Mumbai" />
              </div>

              {/* Country */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={labelStyle}>Country <span style={{ color: 'var(--clr-danger)' }}>*</span></label>
                <input name="country" type="text" value={form.country} onChange={handleChange} required style={inputStyle} placeholder="e.g. India" />
              </div>

              {/* Address — full width */}
              <div style={{ gridColumn: '1/-1', display: 'flex', flexDirection: 'column' }}>
                <label style={labelStyle}>Address</label>
                <input name="address" type="text" value={form.address} onChange={handleChange} style={inputStyle} placeholder="Street / venue address (optional)" />
              </div>

              {/* Prize */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={labelStyle}>Ticket Price (₹)<span style={{ color: 'var(--clr-danger)' }}> *</span></label>
                <input name="prize" type="number" min="0" value={form.prize} onChange={handleChange} style={inputStyle} placeholder="0 for free" />
              </div>

              {/* Max Seats */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={labelStyle}>Max Seats <span style={{ color: 'var(--clr-danger)' }}>*</span></label>
                <input name="maxSeats" type="number" min="1" value={form.maxSeats} onChange={handleChange} required style={inputStyle} placeholder="e.g. 200" />
              </div>

              {/* Description — full width */}
              <div style={{ gridColumn: '1/-1', display: 'flex', flexDirection: 'column' }}>
                <label style={labelStyle}>Description<span style={{ color: 'var(--clr-danger)' }}> *</span></label>
                <textarea name="description" rows={4} value={form.description} onChange={handleChange}
                  style={{ ...inputStyle, resize: 'vertical' }} placeholder="Describe your event…" />
              </div>

              <div style={{ gridColumn: '1/-1', display: 'flex', flexDirection: 'column' }}>
                <label style={labelStyle}>Event Banner / Image (Landscape Preferred)<span style={{ color: 'var(--clr-danger)' }}> *</span></label>
                <input ref={fileRef} type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />

                {imagePreview ? (
                  <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', maxHeight: 220 }}>
                    <img src={imagePreview} alt="Preview" style={{ width: '100%', height: 220, objectFit: 'cover', display: 'block' }} />
                    <button type="button" onClick={() => { setImageFile(null); setImagePreview(null); fileRef.current.value = ''; }}
                      style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(0,0,0,0.6)', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'grid', placeItems: 'center', cursor: 'pointer' }}>
                      <X size={16} color="#fff" />
                    </button>
                  </div>
                ) : (
                  <button type="button" onClick={() => fileRef.current.click()}
                    style={{ border: '2px dashed var(--clr-border)', borderRadius: 12, padding: '28px 20px', background: '#fafafa', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, color: 'var(--clr-text-muted)' }}>
                    <ImagePlus size={28} />
                    <span style={{ fontSize: 14, fontWeight: 600 }}>Click to upload image</span>
                    <span style={{ fontSize: 12 }}>PNG, JPG, WEBP · Max 5 MB</span>
                  </button>
                )}
              </div>

              {/* Actions */}
              <div style={{ gridColumn: '1/-1', display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 8 }}>
                <Button variant="ghost" type="button" onClick={() => navigate(-1)}>Cancel</Button>
                <Button type="submit" loading={loading}>Create Event</Button>
              </div>

            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
