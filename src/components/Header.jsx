import { BookOpen, Home, Database, User } from 'lucide-react'

const NAV_ITEMS = [
  { id: 'Home', label: 'Beranda', icon: Home },
  { id: 'Catalog', label: 'Data Buku (CRUD)', icon: Database },
  { id: 'Profile', label: 'Profil', icon: User },
]

export default function Header({ tab, onTab }) {
  return (
    <header className="bg-slate-900 text-white shadow-md sticky top-0 z-20">
      <div className="max-w-4xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        <div
          onClick={() => onTab('Home')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <BookOpen className="text-amber-400" size={24} />
          <span className="font-bold text-lg tracking-wide">LibTrack PWA</span>
        </div>

        <nav className="flex items-center gap-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const isActive = tab === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-semibold'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon size={16} />
                {item.label}
              </button>
            )
          })}
        </nav>
      </div>
    </header>
  )
}