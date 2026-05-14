import { useState } from 'react'
import MobileNavbar from '../layout/MobileNavbar'
import Sidebar      from '../layout/Sidebar'
import SearchBar    from './SearchBar'
import CategoryTabs from './CategoryTabs'

/**
 * HeroSection — the full purple hero: topbar + search + category chips.
 * Props: onCategoryChange, selectedCategory
 */
export default function HeroSection({ onCategoryChange, selectedCategory }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <header className="hero">
        <MobileNavbar onMenuClick={() => setSidebarOpen(true)} />
        <SearchBar />
        <CategoryTabs selected={selectedCategory} onChange={onCategoryChange} />
      </header>
    </>
  )
}
