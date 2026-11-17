import { UserCheck, Hash, Users, Code2 } from 'lucide-react'

export default function ProfilePage() {

  const mahasiswa = {
    nama: 'Muhammad Dzakwan Fakhriy Habibie',
    nim: '21120120140134',
    kelompok: 'Kelompok 18',
    praktikum: 'Praktikum Pemrograman Perangkat Bergerak (PPB) 2026',
  }

  return (
    <div className="py-6 max-w-xl mx-auto">
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="bg-slate-900 px-6 py-8 text-center text-white">
          <div className="w-20 h-20 bg-amber-500 text-slate-950 rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-2xl">
            {mahasiswa.nama.charAt(0)}
          </div>
          <h1 className="text-xl font-bold">{mahasiswa.nama}</h1>
          <p className="text-slate-400 text-sm mt-1">{mahasiswa.praktikum}</p>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
            <UserCheck className="text-amber-600 shrink-0" size={20} />
            <div>
              <p className="text-xs text-slate-500 uppercase font-semibold">Nama Lengkap</p>
              <p className="font-medium text-slate-900">{mahasiswa.nama}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
            <Hash className="text-amber-600 shrink-0" size={20} />
            <div>
              <p className="text-xs text-slate-500 uppercase font-semibold">NIM</p>
              <p className="font-medium text-slate-900 font-mono">{mahasiswa.nim}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
            <Users className="text-amber-600 shrink-0" size={20} />
            <div>
              <p className="text-xs text-slate-500 uppercase font-semibold">Kelompok</p>
              <p className="font-medium text-slate-900">{mahasiswa.kelompok}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
            <Code2 className="text-amber-600 shrink-0" size={20} />
            <div>
              <p className="text-xs text-slate-500 uppercase font-semibold">Tech Stack</p>
              <p className="text-sm text-slate-700">React JS, Vite, Tailwind CSS, Axios, Vite PWA</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}