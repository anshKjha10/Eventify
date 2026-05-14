import { Search, SlidersHorizontal } from 'lucide-react'
import { useState } from 'react'

/**
 * SearchBar — search input + filter button inside the hero.
 * Props: onSearch (optional callback)
 */
export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('')

  const handleChange = (e) => {
    setQuery(e.target.value)
    onSearch?.(e.target.value)
  }

  return (
    <div className="hero-search">
      <div className="search-field">
        <Search size={20} color="white" />
        <input
          type="text"
          placeholder="Search events..."
          aria-label="Search events"
          value={query}
          onChange={handleChange}
        />
      </div>
      <button className="filter-btn" type="button" aria-label="Open filters">
        <SlidersHorizontal size={18} color="white" />
        Filters
      </button>
    </div>
  )
}
