import { useState, useEffect, useCallback } from 'react'
import bookService from '../services/bookService'

export function useBooks() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchBooks = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await bookService.getBooks()
      if (res.success) {
        setBooks(res.data || [])
      }
    } catch (err) {
      setError(err.message || 'Gagal memuat data buku.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchBooks()
  }, [fetchBooks])

  return { books, loading, error, refetch: fetchBooks }
}