'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { getBooks, deleteBook } from '../actions/bookActions';
import Layout from '../components/Layout';
import BookCard from '../components/BookCard';
import BookForm from '../components/BookForm';
import Button from '../components/ui/Button';

interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
  coverUrl?: string | null;
  summary?: string | null;
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const searchParams = useSearchParams();

  const fetchBooks = async () => {
    try {
      const search = searchParams.get('search') || undefined;
      const sortBy = searchParams.get('sortBy') || undefined;
      const sortOrder = searchParams.get('sortOrder') as 'asc' | 'desc' | undefined;

      const fetchedBooks = await getBooks(search, sortBy, sortOrder);
      setBooks(fetchedBooks);
    } catch (error) {
      console.error('Failed to fetch books:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [searchParams]);

  const handleAddBook = () => {
    setEditingBook(null);
    setShowForm(true);
  };

  const handleEditBook = (book: Book) => {
    setEditingBook(book);
    setShowForm(true);
  };

  const handleDeleteBook = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus buku ini?')) {
      try {
        await deleteBook(id);
        await fetchBooks();
      } catch (error) {
        console.error('Failed to delete book:', error);
        alert('Gagal menghapus buku. Silakan coba lagi.');
      }
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingBook(null);
    fetchBooks();
  };

  if (loading) {
    return (
      <Layout onAddBook={handleAddBook}>
        <div className="flex justify-center items-center h-64">
          <div className="text-xl animate-pulse">Memuat buku...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout onAddBook={handleAddBook}>
      {showForm ? (
        <BookForm book={editingBook || undefined} onClose={handleFormClose} />
      ) : (
        <>
          {books.length === 0 ? (
            <div className="text-center py-12">
              <div className="mb-6">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">Tidak Ada Buku Ditemukan</h2>
                <p className="text-gray-600">Mulai tambahkan buku pertama ke koleksi Anda.</p>
              </div>
              <Button onClick={handleAddBook} className="px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                Tambah Buku Pertama
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {books.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onEdit={handleEditBook}
                  onDelete={handleDeleteBook}
                />
              ))}
            </div>
          )}
        </>
      )}
    </Layout>
  );
}
