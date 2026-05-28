import { useState } from 'react'
import MobileNavbar from '../layout/MobileNavbar'
import Sidebar      from '../layout/Sidebar'
import SearchBar    from './SearchBar'
import CategoryTabs from './CategoryTabs'


export default function HeroSection({ onCategoryChange, selectedCategory, onCityChange }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <header className="hero">
        <MobileNavbar onMenuClick={() => setSidebarOpen(true)} onCityChange={onCityChange} />
        <SearchBar />
        <CategoryTabs selected={selectedCategory} onChange={onCategoryChange} />
      </header>
    </>
  )
}
