import { useEffect } from 'react'
import { X } from 'lucide-react'

/**
 * Base modal component.
 * Props: open, onClose, title, children, width
 */
export default function Modal({ open, onClose, title, children, width = 480 }) {
  // Close on Escape key
  useEffect(() => {
    if (!open) return
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-box"
        style={{ maxWidth: width }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          {title && <h3 className="modal-title">{title}</h3>}
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <X size={20} color="#1a1822" />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">{children}</div>
      </div>

      <style>{`
        .modal-overlay {
          position: fixed; inset: 0; z-index: 200;
          background: rgba(10,10,30,0.5); backdrop-filter: blur(4px);
          display: grid; place-items: center; padding: 20px;
        }
        .modal-box {
          background: #fff; border-radius: 24px; width: 100%;
          box-shadow: 0 32px 80px rgba(0,0,0,0.22);
          animation: modal-in 0.25s ease;
        }
        @keyframes modal-in {
          from { opacity: 0; transform: scale(0.94) translateY(12px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }
        .modal-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 22px 24px 0;
        }
        .modal-title { font-size: 18px; font-weight: 800; color: var(--clr-text); }
        .modal-close {
          width: 34px; height: 34px; border: none; background: #f4f4f8;
          border-radius: 10px; display: grid; place-items: center; cursor: pointer;
          transition: background 0.18s; flex-shrink: 0;
        }
        .modal-close:hover { background: #eaeaf2; }
        .modal-body { padding: 20px 24px 28px; }
      `}</style>
    </div>
  )
}
