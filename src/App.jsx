import { useState } from 'react'
import Header from './components/Header'
import PWABadge from './components/PWABadge'
import HomePage from './pages/HomePage'
import CatalogPage from './pages/CatalogPage'
import ProfilePage from './pages/ProfilePage'

export default function App() {
  const [tab, setTab] = useState('Home')

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header tab={tab} onTab={setTab} />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4">
        {tab === 'Home' && (
          <HomePage onNavigateCatalog={() => setTab('Catalog')} />
        )}
        {tab === 'Catalog' && <CatalogPage />}
        {tab === 'Profile' && <ProfilePage />}
      </main>

      <PWABadge />

      <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-500 mt-10">
        Responsi Praktikum PPB 2026 • LibTrack PWA
      </footer>
    </div>
  )
}