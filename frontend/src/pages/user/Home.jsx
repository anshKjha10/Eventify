import { useState, useEffect } from 'react'
import HeroSection    from '../../components/home/HeroSection'
import UpcomingEvents from '../../components/home/UpcomingEvents'
import NearbyEvents   from '../../components/home/NearbyEvents'
import InviteBanner   from '../../components/home/InviteBanner'
import BottomNavbar   from '../../components/layout/BottomNavbar'
import { eventService } from '../../services/event.service';


export default function Home() {
  const [category, setCategory] = useState(null)
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const [nearbyEvents, setNearbyEvents] = useState([])
  const [userCity, setUserCity] = useState('')
  const [loading, setLoading] = useState(true)

  const normalizeCity = (value = '') =>
    value.toString().trim().toLowerCase().replace(/[^a-z0-9\s]/g, '')

  const getEventCity = (event) => {
    const { location } = event || {}
    if (!location) return ''
    if (typeof location === 'string') return location.split(',')[0]
    return location.city || ''
  }

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await eventService.getAll()
        const now = new Date()

        const upcoming = res.data.events
          .filter(e => new Date(e.date) >= now)
          .sort((a,b) => new Date(a.date) - new Date(b.date))

          setUpcomingEvents(upcoming)
          if (userCity) {
            const userCityKey = normalizeCity(userCity)
            const nearby = upcoming.filter((ev) => normalizeCity(getEventCity(ev)) === userCityKey)
            setNearbyEvents(nearby)
          } else {
            setNearbyEvents([])
          }
      } catch(err) {
        console.error('Failed to fetch events:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [userCity])

  return (
    <div className="app">
      <HeroSection selectedCategory={category} onCategoryChange={setCategory} onCityChange={setUserCity} />

      <main className="content">
        <UpcomingEvents events={upcomingEvents} loading={loading} />
        <InviteBanner />
        <NearbyEvents events={nearbyEvents} loading={loading} />
      </main>

      <BottomNavbar />
    </div>
  )
}
