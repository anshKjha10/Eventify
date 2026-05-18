import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login({ email: form.email, password: form.password });
    navigate('/');
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <span className="auth-logo">Eventify</span>
          <p className="auth-tagline">Discover events near you</p>
        </div>

        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-sub">Sign in to your user account</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <Mail size={18} color="var(--clr-text-muted)" />
            <input
              name="email"
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-field">
            <Lock size={18} color="var(--clr-text-muted)" />
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="eye-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword
                ? <EyeOff size={18} color="var(--clr-text-muted)" />
                : <Eye size={18} color="var(--clr-text-muted)" />}
            </button>
          </div>

          <Link to="/auth/forgot-password" className="auth-forgot">
            Forgot password?
          </Link>

          <button type="submit" className="auth-submit-btn">
            Sign In as User
          </button>
        </form>

        <p className="auth-switch">
          Don&apos;t have an account?{' '}
          <Link to="/auth/register">Register as a user</Link>
        </p>
      </div>

      <style>{`
        .auth-page {
          min-height: 100vh;
          display: grid;
          place-items: center;
          background: linear-gradient(135deg, hsl(247,72%,44%) 0%, hsl(247,72%,30%) 100%);
          padding: 24px;
        }
        .auth-card {
          background: #fff;
          border-radius: 28px;
          padding: 40px 36px;
          width: 100%;
          max-width: 400px;
          box-shadow: 0 24px 64px rgba(0,0,0,0.18);
        }
        .auth-brand { text-align: center; margin-bottom: 32px; }
        .auth-logo {
          font-size: 26px;
          font-weight: 800;
          color: var(--clr-primary);
          letter-spacing: -0.5px;
        }
        .auth-tagline { font-size: 13px; color: var(--clr-text-muted); margin-top: 4px; }
        .auth-title { font-size: 22px; font-weight: 800; color: var(--clr-text); }
        .auth-sub { font-size: 14px; color: var(--clr-text-muted); margin-top: 4px; margin-bottom: 28px; }
        .auth-form { display: flex; flex-direction: column; gap: 14px; }
        .auth-field {
          display: flex;
          align-items: center;
          gap: 12px;
          border: 1.5px solid var(--clr-border);
          border-radius: var(--radius-md);
          padding: 13px 16px;
          background: #fafafa;
          transition: border-color 0.2s;
        }
        .auth-field:focus-within { border-color: var(--clr-primary); background: #fff; }
        .auth-field input {
          flex: 1;
          border: none;
          outline: none;
          background: transparent;
          font-size: 15px;
          color: var(--clr-text);
        }
        .eye-btn { background: none; border: none; padding: 0; display: grid; place-items: center; }
        .auth-forgot {
          font-size: 13px;
          font-weight: 600;
          color: var(--clr-primary);
          align-self: flex-end;
          margin-top: -4px;
        }
        .auth-submit-btn {
          margin-top: 8px;
          padding: 15px;
          border: none;
          border-radius: var(--radius-md);
          background: linear-gradient(135deg, var(--clr-primary), var(--clr-primary-dark));
          color: #fff;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.3px;
          transition: opacity 0.2s, transform 0.15s;
        }
        .auth-submit-btn:hover { opacity: 0.92; transform: translateY(-1px); }
        .auth-switch { text-align: center; font-size: 14px; color: var(--clr-text-muted); margin-top: 24px; }
        .auth-switch a { color: var(--clr-primary); font-weight: 700; }
      `}</style>
    </div>
  )
}
