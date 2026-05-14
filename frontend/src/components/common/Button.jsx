/**
 * Reusable Button component
 *
 * Props:
 *  variant  — 'primary' | 'secondary' | 'danger' | 'ghost'
 *  size     — 'sm' | 'md' | 'lg'
 *  fullWidth — boolean
 *  loading  — boolean
 *  ...rest  — any native button props
 */
export default function Button({
  children,
  variant  = 'primary',
  size     = 'md',
  fullWidth = false,
  loading  = false,
  className = '',
  ...rest
}) {
  const base = 'btn'
  const cls  = [base, `btn--${variant}`, `btn--${size}`, fullWidth ? 'btn--full' : '', className]
    .filter(Boolean).join(' ')

  return (
    <button className={cls} disabled={loading || rest.disabled} {...rest}>
      {loading ? <span className="btn-spinner" /> : children}

      <style>{`
        .btn {
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          border: none; border-radius: var(--radius-md); font-family: var(--font-body);
          font-weight: 700; cursor: pointer; transition: opacity 0.2s, transform 0.15s;
          white-space: nowrap;
        }
        .btn:disabled { opacity: 0.55; cursor: not-allowed; transform: none !important; }
        .btn:hover:not(:disabled)  { opacity: 0.92; transform: translateY(-1px); }
        .btn:active:not(:disabled) { transform: translateY(0); }

        /* Sizes */
        .btn--sm { padding: 8px 16px;  font-size: 13px; }
        .btn--md { padding: 13px 24px; font-size: 15px; }
        .btn--lg { padding: 16px 32px; font-size: 16px; }
        .btn--full { width: 100%; }

        /* Variants */
        .btn--primary {
          background: linear-gradient(135deg, var(--clr-primary), var(--clr-primary-dark));
          color: #fff;
        }
        .btn--secondary {
          background: #eef0ff; color: var(--clr-primary); border: 1.5px solid #d8dcff;
        }
        .btn--danger { background: #fff0f0; color: var(--clr-danger); border: 1.5px solid #ffd6d6; }
        .btn--ghost  { background: transparent; color: var(--clr-primary); border: 1.5px solid var(--clr-border); }

        /* Spinner */
        .btn-spinner {
          width: 16px; height: 16px; border-radius: 50%;
          border: 2.5px solid rgba(255,255,255,0.4);
          border-top-color: #fff;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </button>
  )
}
