import { Dumbbell, Music, Utensils, Mic, Palette, Film, Theater, Computer, PersonStanding } from 'lucide-react'

const TABS = [
  { label: 'Sports', icon: Dumbbell,  cls: 'chip-sports' },
  { label: 'Music',  icon: Music,     cls: 'chip-music'  },
  { label: 'Food',   icon: Utensils,  cls: 'chip-food'   },
  { label: 'Comedy', icon: Mic,       cls: 'chip-comedy' },
  { label: 'Dance',  icon: PersonStanding,   cls: 'chip-dance'},
  { label: 'Tech',   icon: Computer,  cls: 'chip-tech'   },
  { label: 'Art',    icon: Palette,   cls: 'chip-art'    },
  { label: 'Film',   icon: Film,      cls: 'chip-film'   },
  { label: 'Theatre', icon: Theater,  cls: 'chip-theatre'}
]

/**
 * CategoryTabs — horizontal chip row for filtering by category.
 * Props: selected, onChange
 */
export default function CategoryTabs({ selected, onChange }) {
  return (
    <div className="chip-row" role="tablist" aria-label="Event categories">
      {TABS.map(({ label, icon: Icon, cls }) => (
        <button
          key={label}
          role="tab"
          aria-selected={selected === label}
          className={`chip ${cls}${selected === label ? ' chip--active' : ''}`}
          onClick={() => onChange?.(label)}
          style={{ opacity: selected && selected !== label ? 0.7 : 1 }}
        >
          <Icon size={16} color="white" />
          {label}
        </button>
      ))}
    </div>
  )
}
