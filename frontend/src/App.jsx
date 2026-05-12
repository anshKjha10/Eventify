import './App.css'

// ── SVG icons ──────────────────────────────────────────────────────────────────
const MenuIcon = () => (
  <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
    <rect width="22" height="2.5" rx="1.25" fill="white"/>
    <rect y="6.75" width="16" height="2.5" rx="1.25" fill="white"/>
    <rect y="13.5" width="22" height="2.5" rx="1.25" fill="white"/>
  </svg>
)

const BellIcon = () => (
  <svg width="20" height="22" viewBox="0 0 20 22" fill="none">
    <path d="M10 0C10 0 3 3.5 3 11V15L1 17V18H19V17L17 15V11C17 3.5 10 0 10 0Z" fill="white"/>
    <path d="M8 18C8 19.1046 8.89543 20 10 20C11.1046 20 12 19.1046 12 18" stroke="white" strokeWidth="1.5" fill="none"/>
    <circle cx="16" cy="3" r="3" fill="#00D9F5"/>
  </svg>
)

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="8.5" cy="8.5" r="6.5" stroke="white" strokeWidth="2"/>
    <path d="M13.5 13.5L18 18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

const FilterIcon = () => (
  <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
    <path d="M1 1H17M4 7H14M7 13H11" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

const LocationPinIcon = ({ color = '#8b90a5' }) => (
  <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
    <path d="M6 0C3.24 0 1 2.24 1 5C1 8.75 6 14 6 14C6 14 11 8.75 11 5C11 2.24 8.76 0 6 0ZM6 6.5C5.17 6.5 4.5 5.83 4.5 5C4.5 4.17 5.17 3.5 6 3.5C6.83 3.5 7.5 4.17 7.5 5C7.5 5.83 6.83 6.5 6 6.5Z" fill={color}/>
  </svg>
)

const BookmarkIcon = () => (
  <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
    <path d="M1 1H13V17L7 13L1 17V1Z" fill="#ff6b5d" stroke="#ff6b5d" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
)

const DropdownIcon = () => (
  <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
    <path d="M1 1L5 5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

// Nav icons
const ExploreIcon = ({ active }) => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <circle cx="11" cy="11" r="9" stroke={active ? '#5b64ff' : '#aab0cc'} strokeWidth="2"/>
    <path d="M14.5 7.5L12 12L7.5 14.5L10 10L14.5 7.5Z" fill={active ? '#5b64ff' : '#aab0cc'}/>
    <circle cx="11" cy="11" r="1.5" fill={active ? '#5b64ff' : '#aab0cc'}/>
  </svg>
)

const CalendarIcon = ({ active }) => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <rect x="2" y="4" width="18" height="16" rx="3" stroke={active ? '#5b64ff' : '#aab0cc'} strokeWidth="1.8"/>
    <path d="M7 2V5M15 2V5" stroke={active ? '#5b64ff' : '#aab0cc'} strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M2 8H20" stroke={active ? '#5b64ff' : '#aab0cc'} strokeWidth="1.5"/>
    <rect x="6" y="11" width="3" height="3" rx="0.5" fill={active ? '#5b64ff' : '#aab0cc'}/>
    <rect x="11" y="11" width="3" height="3" rx="0.5" fill={active ? '#5b64ff' : '#aab0cc'}/>
  </svg>
)

const MapIcon = ({ active }) => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M2 5L8 2L14 5L20 2V17L14 20L8 17L2 20V5Z" stroke={active ? '#5b64ff' : '#aab0cc'} strokeWidth="1.8" strokeLinejoin="round"/>
    <path d="M8 2V17M14 5V20" stroke={active ? '#5b64ff' : '#aab0cc'} strokeWidth="1.5"/>
  </svg>
)

const ProfileIcon = ({ active }) => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <circle cx="11" cy="8" r="4" stroke={active ? '#5b64ff' : '#aab0cc'} strokeWidth="1.8"/>
    <path d="M3 20C3 16.134 6.134 13 10 13H12C15.866 13 19 16.134 19 20" stroke={active ? '#5b64ff' : '#aab0cc'} strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
)

// Category chip icons
const SportsChipIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="7" stroke="white" strokeWidth="1.5"/>
    <path d="M3 5C5 6 8 6 11 4M3 11C5 10 8 10 11 12M8 1V15" stroke="white" strokeWidth="1.2"/>
  </svg>
)

const MusicChipIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M6 12V4L14 2V10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="4" cy="12" r="2" fill="white"/>
    <circle cx="12" cy="10" r="2" fill="white"/>
  </svg>
)

const FoodChipIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M4 2V8C4 9.657 5.343 11 7 11M7 11V14M7 11H9" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 2C12 2 14 4 14 7C14 9.5 12.5 11 11 11V14" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

// Avatar component
const Avatar = ({ initials, bg }) => (
  <span className="avatar" style={{ background: bg }}>{initials}</span>
)

// Event card illustrations using SVG
const HandsIllustration = () => (
  <svg viewBox="0 0 260 140" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
    <rect width="260" height="140" rx="16" fill="#FFD6C8"/>
    {/* background circle */}
    <circle cx="130" cy="70" r="60" fill="rgba(255,180,160,0.4)"/>
    {/* leaves left */}
    <ellipse cx="60" cy="100" rx="28" ry="14" fill="#7DC98C" transform="rotate(-30 60 100)"/>
    <ellipse cx="40" cy="115" rx="22" ry="10" fill="#5BB870" transform="rotate(-20 40 115)"/>
    <ellipse cx="80" cy="115" rx="20" ry="9" fill="#7DC98C" transform="rotate(20 80 115)"/>
    {/* leaves right */}
    <ellipse cx="200" cy="100" rx="28" ry="14" fill="#7DC98C" transform="rotate(30 200 100)"/>
    <ellipse cx="220" cy="115" rx="22" ry="10" fill="#5BB870" transform="rotate(20 220 115)"/>
    {/* hearts */}
    <text x="118" y="50" fontSize="22" fill="#FF8C7A">♥</text>
    <text x="148" y="38" fontSize="14" fill="#FF8C7A">♥</text>
    {/* hands holding */}
    <path d="M90 115 Q100 70 130 65 Q160 70 170 115" fill="#FFAA90" stroke="#FF8C7A" strokeWidth="2"/>
    <path d="M108 115 Q112 80 130 75 Q148 80 152 115" fill="#FF9070"/>
    {/* fingers */}
    <path d="M100 110 Q95 85 98 75" stroke="#FFAA90" strokeWidth="8" strokeLinecap="round" fill="none"/>
    <path d="M112 108 Q108 78 112 68" stroke="#FFAA90" strokeWidth="8" strokeLinecap="round" fill="none"/>
    <path d="M160 110 Q165 85 162 75" stroke="#FFAA90" strokeWidth="8" strokeLinecap="round" fill="none"/>
    <path d="M148 108 Q152 78 148 68" stroke="#FFAA90" strokeWidth="8" strokeLinecap="round" fill="none"/>
  </svg>
)

const SneakerIllustration = () => (
  <svg viewBox="0 0 260 140" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
    <rect width="260" height="140" rx="16" fill="#C7E9FF"/>
    {/* background circle */}
    <circle cx="160" cy="60" r="55" fill="rgba(150,210,255,0.4)"/>
    {/* sneaker body */}
    <path d="M50 100 Q70 60 130 55 Q180 50 210 75 L215 95 Q160 108 50 100Z" fill="#2A2A72"/>
    {/* sole */}
    <path d="M48 100 Q130 115 216 95 L216 105 Q130 120 48 110Z" fill="#1a1a50"/>
    {/* upper detail white */}
    <path d="M80 95 Q110 70 155 65 Q185 62 205 78" stroke="white" strokeWidth="2" fill="none" opacity="0.6"/>
    {/* laces */}
    <path d="M110 85 L125 72M120 87 L135 74M130 89 L145 76M140 90 L155 78M150 90 L165 80" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    {/* tongue */}
    <path d="M108 90 Q115 60 125 58 L120 90Z" fill="#3a3a8a"/>
    {/* swoosh */}
    <path d="M90 92 Q130 75 185 82" stroke="#FF6B35" strokeWidth="4" strokeLinecap="round" fill="none"/>
    {/* star */}
    <text x="195" y="45" fontSize="20" fill="white" opacity="0.8">★</text>
    <text x="55" y="55" fontSize="14" fill="white" opacity="0.6">★</text>
  </svg>
)

// Gift illustration for invite card
const GiftIllustration = () => (
  <svg viewBox="0 0 160 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
    {/* confetti */}
    <circle cx="20" cy="20" r="4" fill="#FF6B5D" opacity="0.8"/>
    <circle cx="140" cy="15" r="3" fill="#5B64FF" opacity="0.7"/>
    <circle cx="150" cy="50" r="4" fill="#FFC107" opacity="0.8"/>
    <circle cx="10" cy="70" r="3" fill="#2CD4F7" opacity="0.7"/>
    <rect x="25" y="50" width="6" height="6" rx="1" fill="#7DC98C" transform="rotate(20 25 50)"/>
    <rect x="130" y="80" width="5" height="5" rx="1" fill="#FF9C5F" transform="rotate(-15 130 80)"/>
    {/* hands reaching */}
    <path d="M5 120 Q25 95 45 90 L50 100 Q35 108 20 130Z" fill="#FFAA90"/>
    <path d="M155 120 Q135 90 118 88 L115 100 Q130 105 142 128Z" fill="#FFAA90"/>
    {/* gift box bottom */}
    <rect x="40" y="65" width="80" height="55" rx="4" fill="#F5C518"/>
    {/* gift box top / lid */}
    <rect x="35" y="50" width="90" height="22" rx="4" fill="#5B64FF"/>
    {/* ribbon vertical */}
    <rect x="75" y="50" width="10" height="70" rx="2" fill="#FF6B5D"/>
    {/* ribbon horizontal on lid */}
    <rect x="35" y="57" width="90" height="8" rx="2" fill="#FF6B5D"/>
    {/* bow left loop */}
    <ellipse cx="60" cy="48" rx="16" ry="9" fill="#FF9C5F" transform="rotate(-25 60 48)"/>
    {/* bow right loop */}
    <ellipse cx="100" cy="48" rx="16" ry="9" fill="#FF9C5F" transform="rotate(25 100 48)"/>
    {/* bow center */}
    <circle cx="80" cy="50" r="7" fill="#FF6B5D"/>
    {/* shine on box */}
    <rect x="48" y="73" width="12" height="35" rx="2" fill="rgba(255,255,255,0.25)"/>
  </svg>
)

// ── Main component ──────────────────────────────────────────────────────────────
function App() {
  return (
    <div className="app">

      {/* ── HERO HEADER ── */}
      <header className="hero">
          <div className="hero-topbar">
            <button className="icon-btn" aria-label="Open menu"><MenuIcon /></button>
            <div className="location">
              <span className="eyebrow">Current Location <DropdownIcon /></span>
              <span className="city">New York, USA</span>
            </div>
            <button className="icon-btn notif-btn" aria-label="Notifications">
              <BellIcon />
            </button>
          </div>

          <div className="hero-search">
            <div className="search-field">
              <SearchIcon />
              <input type="text" placeholder="Search..." aria-label="Search" />
            </div>
            <button className="filter-btn" type="button">
              <FilterIcon />
              Filters
            </button>
          </div>

          <div className="chip-row">
            <button className="chip chip-sports"><SportsChipIcon /> Sports</button>
            <button className="chip chip-music"><MusicChipIcon /> Music</button>
            <button className="chip chip-food"><FoodChipIcon /> Food</button>
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
                <button className="bookmark-btn" aria-label="Save event"><BookmarkIcon /></button>
              </div>
              <div className="card-art">
                <HandsIllustration />
              </div>
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
                  <LocationPinIcon />
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
              <div className="card-art">
                <SneakerIllustration />
              </div>
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
                  <LocationPinIcon />
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
            <div className="invite-art">
              <GiftIllustration />
            </div>
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
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M11 4V18M4 11H18" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
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
