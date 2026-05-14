import { useState } from 'react'
import HeroSection    from '../../components/home/HeroSection'
import UpcomingEvents from '../../components/home/UpcomingEvents'
import NearbyEvents   from '../../components/home/NearbyEvents'
import InviteBanner   from '../../components/home/InviteBanner'
import BottomNavbar   from '../../components/layout/BottomNavbar'

export default function Home() {
  const [category, setCategory] = useState(null)

  // TODO: replace with real data from eventService
  const upcomingEvents = []
  const nearbyEvents   = []

  return (
    <div className="app">
      <HeroSection selectedCategory={category} onCategoryChange={setCategory} />

      <main className="content">
        <UpcomingEvents events={upcomingEvents} />
        <InviteBanner />
        <NearbyEvents events={nearbyEvents} />
      </main>

      <BottomNavbar />
    </div>
  )
}
