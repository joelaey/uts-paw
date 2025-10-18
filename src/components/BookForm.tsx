'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBook, updateBook } from '../actions/bookActions';
import { BookFormData } from '../lib/validations';
import Button from './ui/Button';
import Input from './ui/Input';
import Card from './ui/Card';

interface BookFormProps {
  book?: {
    id: string;
    title: string;
    author: string;
    year: number;
    coverUrl?: string | null;
    summary?: string | null;
  };
  onClose?: () => void;
}

export default function BookForm({ book, onClose }: BookFormProps) {
  const [formData, setFormData] = useState<BookFormData>({
    title: book?.title || '',
    author: book?.author || '',
    year: book?.year || new Date().getFullYear(),
    coverUrl: book?.coverUrl || '',
    summary: book?.summary || '',
  });

  // errors diset hanya string supaya tipe tetap aman
  const [errors, setErrors] = useState<Partial<Record<keyof BookFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'year' ? parseInt(value) || 0 : value,
    }));

    if (errors[name as keyof BookFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('author', formData.author);
      formDataToSend.append('year', formData.year.toString());
      if (formData.coverUrl) formDataToSend.append('coverUrl', formData.coverUrl);
      if (formData.summary) formDataToSend.append('summary', formData.summary);

      if (book) {
        await updateBook(book.id, formDataToSend);
      } else {
        await createBook(formDataToSend);
      }

      if (onClose) {
        onClose();
      } else {
        router.push('/');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ title: 'Failed to save book. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto shadow-2xl border-0 bg-white/95 backdrop-blur-xl">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
          {book ? '✏️ Edit Buku' : '📚 Tambah Buku Baru'}
        </h2>
        <p className="text-gray-600 mt-2">
          {book ? 'Perbarui informasi buku Anda' : 'Tambahkan buku baru ke koleksi Anda'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Judul */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">📖 Judul Buku</label>
            <Input
              name="title"
              placeholder="Masukkan judul buku..."
              value={formData.title}
              onChange={handleChange}
              required
              error={errors.title}
              className="bg-white/80 backdrop-blur-sm border-gray-200/50 focus:border-teal-400"
            />
          </div>

          {/* Penulis */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">👤 Penulis</label>
            <Input
              name="author"
              placeholder="Masukkan nama penulis..."
              value={formData.author}
              onChange={handleChange}
              required
              error={errors.author}
              className="bg-white/80 backdrop-blur-sm border-gray-200/50 focus:border-teal-400"
            />
          </div>
        </div>

        {/* Tahun & Cover URL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">📅 Tahun Terbit</label>
            <Input
              type="number"
              name="year"
              placeholder="2024"
              value={formData.year.toString()}
              onChange={handleChange}
              required
              error={errors.year}
              className="bg-white/80 backdrop-blur-sm border-gray-200/50 focus:border-teal-400"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">🖼️ URL Sampul (Opsional)</label>
            <Input
              type="number"
              name="year"
              placeholder="2024"
              value={formData.year.toString()}
              onChange={handleChange}
              required
              error={errors.year?.toString()}
            />
          </div>
        </div>

        {/* Ringkasan */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">📝 Ringkasan Buku (Opsional)</label>
          <textarea
            name="summary"
            placeholder="Tulis ringkasan singkat tentang buku ini..."
            value={formData.summary}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl glass bg-white/80 backdrop-blur-sm text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-200 resize-none border border-gray-200/50"
            rows={4}
          />
        </div>

        {/* Tombol */}
        <div className="flex gap-4 justify-end pt-6 border-t border-gray-200/50">
          {onClose && (
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              className="px-6 py-3 font-semibold hover:bg-gray-50 transition-all duration-200"
            >
              ❌ Batal
            </Button>
          )}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 font-semibold bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            {isSubmitting ? '💾 Menyimpan...' : book ? '✅ Update Buku' : '➕ Tambah Buku'}
          </Button>
        </div>
      </form>
    </Card>
  );
}
