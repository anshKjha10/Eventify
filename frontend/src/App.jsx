import { useState } from 'react'
import './App.css'
import {
  Menu, Bell, Search, SlidersHorizontal, MapPin, Bookmark,
  ChevronDown, Compass, Calendar, Map, User, Music, Utensils, Plus,
  MessageCircle, Settings, LogOut, X, Dumbbell, Mail
} from 'lucide-react'

const ExploreIcon = ({ active }) => (
  <Compass size={22} color={active ? '#5b64ff' : '#aab0cc'} />
)
const CalendarIcon = ({ active }) => (
  <Calendar size={22} color={active ? '#5b64ff' : '#aab0cc'} />
)
const MapIcon = ({ active }) => (
  <Map size={22} color={active ? '#5b64ff' : '#aab0cc'} />
)
const ProfileIcon = ({ active }) => (
  <User size={22} color={active ? '#5b64ff' : '#aab0cc'} />
)

const Avatar = ({ initials, bg }) => (
  <span className="avatar" style={{ background: bg }}>{initials}</span>
)



function App() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div className="app">

      <div className={`drawer-overlay${drawerOpen ? ' drawer-overlay--open' : ''}`} onClick={() => setDrawerOpen(false)} />
      <aside className={`side-drawer${drawerOpen ? ' side-drawer--open' : ''}`} aria-label="Navigation drawer">
        <button className="drawer-close" onClick={() => setDrawerOpen(false)} aria-label="Close menu">
          <X size={22} color="#1a1822" />
        </button>


        <div className="drawer-profile">
          <div className="drawer-avatar-wrap"></div>
          <div className="drawer-user-info">
            <span className="drawer-name">Ashfak Sayem</span>
            <span className="drawer-sub">View Profile</span>
          </div>
        </div>

        <nav className="drawer-nav">
          <button className="drawer-item">
            <User size={20} color="#5b64ff" />
            <span>My Profile</span>
          </button>
          <button className="drawer-item">
            <MessageCircle size={20} color="#5b64ff" />
            <span>Messages</span>
          </button>
          <button className="drawer-item">
            <Bookmark size={20} color="#5b64ff" />
            <span>Bookmark</span>
          </button>
          <button className="drawer-item">
            <Mail size={20} color="#5b64ff" />
            <span>Contact Us</span>
          </button>
          <button className="drawer-item">
            <Settings size={20} color="#5b64ff" />
            <span>Settings</span>
          </button>
        </nav>

        <div className="drawer-footer">
          <button className="drawer-item drawer-signout">
            <LogOut size={20} color="#ff5c5c" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ── HERO HEADER ── */}
      <header className="hero">
          <div className="hero-topbar">
            <button className="icon-btn" aria-label="Open menu" onClick={() => setDrawerOpen(true)}><Menu size={22} color="white" /></button>
            <div className="location">
              <span className="eyebrow">Current Location <ChevronDown size={12} color="white" style={{display:'inline',verticalAlign:'middle'}} /></span>
              <span className="city">New York, USA</span>
            </div>
            <button className="icon-btn notif-btn" aria-label="Notifications">
              <Bell size={20} color="white" />
            </button>
          </div>

          <div className="hero-search">
            <div className="search-field">
              <Search size={20} color="white" />
              <input type="text" placeholder="Search..." aria-label="Search" />
            </div>
            <button className="filter-btn" type="button">
              <SlidersHorizontal size={18} color="white" />
              Filters
            </button>
          </div>

          <div className="chip-row">
            <button className="chip chip-sports"><Dumbbell size={16} color="white" /> Sports</button>
            <button className="chip chip-music"><Music size={16} color="white" /> Music</button>
            <button className="chip chip-food"><Utensils size={16} color="white" /> Food</button>
          </div>


        </header>

        {/* ── MAIN CONTENT ── */}
        <main className="content">

          {/* Upcoming Events */}
          <div className="section-header">
            <h2 className="section-title">Upcoming Events</h2>
            <button className="see-all-btn">See All <span>›</span></button>
          </div>

          <div className="cards-scroll">
            {/* Card 1 */}
            <article className="event-card card-peach">
              <div className="card-top">
                <div className="date-badge">
                  <span className="date-day">10</span>
                  <span className="date-month">JUNE</span>
                </div>
                <button className="bookmark-btn" aria-label="Save event"><Bookmark size={18} fill="#ff6b5d" color="#ff6b5d" /></button>
              </div>
              <div className="card-art"></div>
              <div className="card-body">
                <h3>International Band Mu...</h3>
                <div className="attendees">
                  <div className="avatars">
                    <Avatar initials="AJ" bg="#ffb3a3"/>
                    <Avatar initials="KM" bg="#a3d4ff"/>
                    <Avatar initials="LU" bg="#b3e0c8"/>
                  </div>
                  <span className="going">+20 Going</span>
                </div>
                <div className="meta">
                  <MapPin size={12} color="#8b90a5" />
                  <span>36 Guild Street London, UK</span>
                </div>
              </div>
            </article>

            {/* Card 2 */}
            <article className="event-card card-sky">
              <div className="card-top">
                <div className="date-badge">
                  <span className="date-day">10</span>
                  <span className="date-month">JUNE</span>
                </div>
              </div>
              <div className="card-art"></div>
              <div className="card-body">
                <h3>Jo Malone...</h3>
                <div className="attendees">
                  <div className="avatars">
                    <Avatar initials="NA" bg="#ffd6a3"/>
                    <Avatar initials="OP" bg="#c3b0ff"/>
                  </div>
                  <span className="going">+20</span>
                </div>
                <div className="meta">
                  <MapPin size={12} color="#8b90a5" />
                  <span>Radius Gal...</span>
                </div>
              </div>
            </article>
          </div>

          {/* Invite Card */}
          <section className="invite-card">
            <div className="invite-text">
              <h3>Invite your friends</h3>
              <p>Get $20 for ticket</p>
              <button className="invite-btn">INVITE</button>
            </div>
            <div className="invite-art"></div>
          </section>

          {/* Nearby You */}
          <div className="section-header">
            <h2 className="section-title">Nearby You</h2>
            <button className="see-all-btn">See All <span>›</span></button>
          </div>

        </main>

        {/* ── BOTTOM NAV ── */}
        <nav className="bottom-nav" aria-label="Primary">
          <button className="nav-item is-active">
            <ExploreIcon active={true}/>
            <span>Explore</span>
          </button>
          <button className="nav-item">
            <CalendarIcon active={false}/>
            <span>Events</span>
          </button>
          <button className="nav-plus" aria-label="Add event">
            <Plus size={22} color="white" strokeWidth={2.5} />
          </button>
          <button className="nav-item">
            <MapIcon active={false}/>
            <span>Map</span>
          </button>
          <button className="nav-item">
            <ProfileIcon active={false}/>
            <span>Profile</span>
          </button>
      </nav>

    </div>
  )
}

export default App
