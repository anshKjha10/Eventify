import { useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, CalendarDays, Users, LogOut, ChevronRight
} from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

const LINKS = [
  { icon: LayoutDashboard, label: 'Dashboard',    path: '/admin/dashboard' },
  { icon: CalendarDays,    label: 'Manage Events', path: '/admin/events' },
  { icon: Users,           label: 'Participants',  path: '/admin/participants' },
]

export default function AdminSidebar() {
  const navigate         = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    await logout()
    navigate('/auth/login')
  }

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar__brand">
        <span>Eventify</span>
        <span className="admin-sidebar__badge">Admin</span>
      </div>

      <nav className="admin-sidebar__nav">
        {LINKS.map(({ icon: Icon, label, path }) => (
          <button
            key={path}
            className="admin-sidebar__item"
            onClick={() => navigate(path)}
          >
            <Icon size={18} />
            <span>{label}</span>
            <ChevronRight size={14} style={{ marginLeft: 'auto', opacity: 0.4 }} />
          </button>
        ))}
      </nav>

      <div className="admin-sidebar__footer">
        <div className="admin-sidebar__user">
          <span className="admin-sidebar__user-name">{user?.name || 'Admin'}</span>
          <span className="admin-sidebar__user-role">{user?.email}</span>
        </div>
        <button className="admin-sidebar__logout" onClick={handleLogout}>
          <LogOut size={16} />
        </button>
      </div>

      <style>{`
        .admin-sidebar {
          width: 240px; min-height: 100vh; background: #1a1822;
          display: flex; flex-direction: column; padding: 24px 0;
          position: fixed; top: 0; left: 0; bottom: 0; z-index: 50;
        }
        .admin-sidebar__brand {
          display: flex; align-items: center; gap: 10px;
          padding: 0 20px 28px; font-size: 20px; font-weight: 800; color: #fff;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .admin-sidebar__badge {
          font-size: 10px; font-weight: 700; background: var(--clr-primary);
          color: #fff; padding: 2px 8px; border-radius: var(--radius-full);
        }
        .admin-sidebar__nav { flex: 1; padding: 16px 12px; display: flex; flex-direction: column; gap: 4px; }
        .admin-sidebar__item {
          display: flex; align-items: center; gap: 12px; padding: 12px 14px;
          border: none; background: none; color: rgba(255,255,255,0.65);
          border-radius: var(--radius-sm); cursor: pointer; font-size: 14px;
          font-weight: 600; transition: background 0.18s, color 0.18s;
          font-family: var(--font-body); width: 100%; text-align: left;
        }
        .admin-sidebar__item:hover { background: rgba(255,255,255,0.08); color: #fff; }
        .admin-sidebar__footer {
          padding: 16px 20px; border-top: 1px solid rgba(255,255,255,0.08);
          display: flex; align-items: center; gap: 12px;
        }
        .admin-sidebar__user { flex: 1; }
        .admin-sidebar__user-name { display: block; font-size: 13px; font-weight: 700; color: #fff; }
        .admin-sidebar__user-role { display: block; font-size: 11px; color: rgba(255,255,255,0.45); }
        .admin-sidebar__logout {
          width: 32px; height: 32px; border: none; background: rgba(255,92,92,0.15);
          border-radius: 8px; display: grid; place-items: center;
          cursor: pointer; color: #ff5c5c; transition: background 0.18s;
        }
        .admin-sidebar__logout:hover { background: rgba(255,92,92,0.25); }
      `}</style>
    </aside>
  )
}
