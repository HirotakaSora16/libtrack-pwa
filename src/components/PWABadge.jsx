import { useState, useEffect } from 'react'
import { Download, WifiOff, X } from 'lucide-react'

export default function PWABadge() {
  const [installPrompt, setInstallPrompt] = useState(null)
  const [isOffline, setIsOffline] = useState(!navigator.onLine)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const handleBeforeInstall = (e) => {
      e.preventDefault()
      setInstallPrompt(e)
    }
    const handleOnline = () => setIsOffline(false)
    const handleOffline = () => setIsOffline(true)

    window.addEventListener('beforeinstallprompt', handleBeforeInstall)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall)
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const handleInstall = async () => {
    if (!installPrompt) return
    installPrompt.prompt()
    await installPrompt.userChoice
    setInstallPrompt(null)
  }

  if (dismissed) return null

  if (isOffline) {
    return (
      <div className="fixed bottom-4 right-4 bg-amber-100 border border-amber-400 text-amber-900 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 text-sm z-50">
        <WifiOff size={18} />
        <span>Mode Offline Aktif. Data tetap tersimpan secara lokal.</span>
      </div>
    )
  }

  if (installPrompt) {
    return (
      <div className="fixed bottom-4 right-4 bg-white border border-slate-200 px-4 py-3 rounded-lg shadow-xl flex items-center gap-3 text-sm z-50">
        <Download size={18} className="text-amber-600" />
        <span>Install <strong>LibTrack PWA</strong> ke perangkat Anda.</span>
        <button
          onClick={handleInstall}
          className="bg-slate-900 text-white px-3 py-1.5 rounded-md font-medium hover:bg-slate-800"
        >
          Install
        </button>
        <button onClick={() => setDismissed(true)} className="text-slate-400 hover:text-slate-600">
          <X size={16} />
        </button>
      </div>
    )
  }

  return null
}