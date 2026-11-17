import { apiClient, BASE_URL } from '../config/api'

const STORAGE_KEY = 'libtrack_books_data'

const INITIAL_BOOKS = [
  {
    id: '1',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    category: 'Pemrograman',
    year: 2008,
  },
  {
    id: '2',
    title: 'Design Patterns',
    author: 'Erich Gamma',
    category: 'Arsitektur Software',
    year: 1994,
  },
]

const getLocalBooks = () => {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_BOOKS))
    return INITIAL_BOOKS
  }
  return JSON.parse(raw)
}

const saveLocalBooks = (books) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books))
}

class BookService {
  async getBooks() {
    if (BASE_URL) {
      const data = await apiClient.get('/books')
      return { success: true, data }
    }
    return { success: true, data: getLocalBooks() }
  }

  async createBook(payload) {
    if (BASE_URL) {
      const data = await apiClient.post('/books', payload)
      return { success: true, data }
    }
    const books = getLocalBooks()
    const newBook = { id: String(Date.now()), ...payload }
    const updated = [newBook, ...books]
    saveLocalBooks(updated)
    return { success: true, data: newBook }
  }

  async updateBook(id, payload) {
    if (BASE_URL) {
      const data = await apiClient.put(`/books/${id}`, payload)
      return { success: true, data }
    }
    const books = getLocalBooks()
    const updated = books.map((b) => (b.id === id ? { ...b, ...payload } : b))
    saveLocalBooks(updated)
    return { success: true, data: updated.find((b) => b.id === id) }
  }

  async deleteBook(id) {
    if (BASE_URL) {
      await apiClient.delete(`/books/${id}`)
      return { success: true }
    }
    const books = getLocalBooks()
    const updated = books.filter((b) => b.id !== id)
    saveLocalBooks(updated)
    return { success: true }
  }
}

export default new BookService()