import { ArrowRight, WifiOff, Smartphone, Database } from 'lucide-react'

export default function HomePage({ onNavigateCatalog }) {
  return (
    <div className="space-y-8 py-6">
      <section className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
        <span className="inline-block bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full mb-3">
          PROGRESSIVE WEB APP
        </span>
        <h1 className="text-3xl font-bold text-slate-900 mb-3">
          Kelola Koleksi Buku Lebih Cepat &amp; Offline-Ready
        </h1>
        <p className="text-slate-600 max-w-2xl mb-6 leading-relaxed">
          LibTrack PWA membantu mencatat, memperbarui, dan mengelola daftar bacaan Anda.
          Dirancang dengan React, Vite, dan Service Worker sehingga tetap berjalan lancar tanpa koneksi internet.
        </p>
        <button
          onClick={onNavigateCatalog}
          className="inline-flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-slate-800 transition"
        >
          Kelola Data Buku <ArrowRight size={18} />
        </button>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <Database className="text-amber-500 mb-2" size={24} />
          <h3 className="font-semibold text-slate-900">CRUD Fungsional</h3>
          <p className="text-sm text-slate-600 mt-1">Tambah, baca, ubah, dan hapus data buku secara real-time.</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <WifiOff className="text-amber-500 mb-2" size={24} />
          <h3 className="font-semibold text-slate-900">Dukungan Offline</h3>
          <p className="text-sm text-slate-600 mt-1">Aplikasi dan data tetap dapat diakses meskipun internet terputus.</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <Smartphone className="text-amber-500 mb-2" size={24} />
          <h3 className="font-semibold text-slate-900">Installable App</h3>
          <p className="text-sm text-slate-600 mt-1">Dapat dipasang langsung ke layar utama smartphone maupun desktop.</p>
        </div>
      </section>
    </div>
  )
}