export default function Loader({ size = 40, color = 'var(--clr-primary)' }) {
  return (
    <div className="loader-wrap">
      <svg
        width={size}
        height={size}
        viewBox="0 0 50 50"
        style={{ animation: 'rotate 1.4s linear infinite' }}
      >
        <circle
          cx="25" cy="25" r="20"
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="90 150"
          style={{ animation: 'dash 1.4s ease-in-out infinite' }}
        />
      </svg>

      <style>{`
        .loader-wrap {
          display: flex; align-items: center; justify-content: center;
          padding: 32px;
        }
        @keyframes rotate { 100% { transform: rotate(360deg); } }
        @keyframes dash {
          0%   { stroke-dasharray: 1 150; stroke-dashoffset: 0; }
          50%  { stroke-dasharray: 90 150; stroke-dashoffset: -35px; }
          100% { stroke-dasharray: 90 150; stroke-dashoffset: -124px; }
        }
      `}</style>
    </div>
  )
}

/** Full-page centered loader */
export function PageLoader() {
  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
      <Loader size={52} />
    </div>
  )
}
