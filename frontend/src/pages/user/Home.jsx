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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await eventService.getAll()
        const now = new Date()

        const upcoming = res.data.events
          .filter(e => new Date(e.date) >= now)
          .sort((a,b) => new Date(a.date) - new Date(b.date))

          setUpcomingEvents(upcoming)
          setNearbyEvents(upcoming)
      } catch(err) {
        console.error('Failed to fetch events:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  return (
    <div className="app">
      <HeroSection selectedCategory={category} onCategoryChange={setCategory} />

      <main className="content">
        <UpcomingEvents events={upcomingEvents} loading={loading} />
        <InviteBanner />
        <NearbyEvents events={nearbyEvents} loading={loading} />
      </main>

      <BottomNavbar />
    </div>
  )
}
