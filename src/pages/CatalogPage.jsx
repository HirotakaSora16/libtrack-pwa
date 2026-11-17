import { useState } from 'react'
import { Plus, Pencil, Trash2, Search, Loader } from 'lucide-react'
import { useBooks } from '../hooks/useBooks'
import bookService from '../services/bookService'

export default function CatalogPage() {
  const { books, loading, refetch } = useBooks()
  const [search, setSearch] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState({
    title: '',
    author: '',
    category: 'Pemrograman',
    year: new Date().getFullYear(),
  })

  const filteredBooks = books.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase())
  )

  const resetForm = () => {
    setEditingId(null)
    setForm({
      title: '',
      author: '',
      category: 'Pemrograman',
      year: new Date().getFullYear(),
    })
  }

  // CREATE & UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title.trim() || !form.author.trim()) return

    if (editingId) {
      await bookService.updateBook(editingId, { ...form, year: Number(form.year) })
    } else {
      await bookService.createBook({ ...form, year: Number(form.year) })
    }
    resetForm()
    refetch()
  }

  // PREPARE EDIT
  const handleEdit = (book) => {
    setEditingId(book.id)
    setForm({
      title: book.title,
      author: book.author,
      category: book.category,
      year: book.year,
    })
  }

  // DELETE
  const handleDelete = async (id) => {
    if (!confirm('Hapus buku ini dari daftar?')) return
    await bookService.deleteBook(id)
    if (editingId === id) resetForm()
    refetch()
  }

  return (
    <div className="space-y-6 py-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Manajemen Data Buku (CRUD)</h1>
        <p className="text-sm text-slate-600">Tambahkan, perbarui, atau hapus koleksi buku Anda.</p>
      </div>

      {/* Form Create / Update */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4"
      >
        <h2 className="font-semibold text-slate-800">
          {editingId ? 'Edit Data Buku' : 'Tambah Buku Baru'}
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
          <input
            type="text"
            placeholder="Judul Buku *"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="border border-slate-300 rounded-lg px-3 py-2 text-sm"
            required
          />
          <input
            type="text"
            placeholder="Nama Penulis *"
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
            className="border border-slate-300 rounded-lg px-3 py-2 text-sm"
            required
          />
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white"
          >
            <option value="Pemrograman">Pemrograman</option>
            <option value="Arsitektur Software">Arsitektur Software</option>
            <option value="Jaringan & Cloud">Jaringan &amp; Cloud</option>
            <option value="Sains & Umum">Sains &amp; Umum</option>
          </select>
          <input
            type="number"
            placeholder="Tahun Terbit"
            value={form.year}
            onChange={(e) => setForm({ ...form, year: e.target.value })}
            className="border border-slate-300 rounded-lg px-3 py-2 text-sm"
            required
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800"
          >
            <Plus size={16} />
            {editingId ? 'Simpan Perubahan' : 'Tambah Buku'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50"
            >
              Batal
            </button>
          )}
        </div>
      </form>

      {/* Search Bar */}
      <div className="relative">
        <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
        <input
          type="text"
          placeholder="Cari judul atau penulis..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-sm"
        />
      </div>

      {/* Daftar Buku (Read) */}
      {loading ? (
        <div className="flex justify-center py-10 text-slate-500">
          <Loader className="animate-spin" size={24} />
        </div>
      ) : filteredBooks.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-500 text-sm">
          Belum ada data buku yang sesuai.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white border border-slate-200 rounded-xl p-4 flex items-start justify-between gap-4 shadow-sm"
            >
              <div>
                <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                  {book.category} • {book.year}
                </span>
                <h3 className="font-bold text-slate-900 text-lg mt-1">{book.title}</h3>
                <p className="text-sm text-slate-600">Penulis: {book.author}</p>
              </div>
              <div className="flex gap-1.5 shrink-0">
                <button
                  onClick={() => handleEdit(book)}
                  className="p-2 text-slate-600 hover:text-amber-600 hover:bg-amber-50 rounded-lg"
                  title="Edit"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(book.id)}
                  className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg"
                  title="Hapus"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}