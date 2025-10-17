import Image from 'next/image';
import Button from './ui/Button';
import Card from './ui/Card';

interface BookCardProps {
  book: {
    id: string;
    title: string;
    author: string;
    year: number;
    coverUrl?: string | null;
    summary?: string | null;
  };
  onEdit: (book: BookCardProps['book']) => void;
  onDelete: (id: string) => void;
}

export default function BookCard({ book, onEdit, onDelete }: BookCardProps) {
  return (
    <Card className="hover:scale-105 transition-transform duration-200">
      <div className="flex flex-col h-full">
        {book.coverUrl && (
          <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
            <Image
              src={book.coverUrl}
              alt={book.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2 line-clamp-2 text-gray-800">{book.title}</h3>
          <p className="text-gray-600 mb-1 font-medium">oleh {book.author}</p>
          <p className="text-sm text-teal-600 font-semibold mb-4">Tahun {book.year}</p>
          {book.summary && (
            <p className="text-sm text-gray-700 line-clamp-3 mb-4 leading-relaxed">{book.summary}</p>
          )}
        </div>
        <div className="flex gap-3 mt-auto pt-4 border-t border-gray-200/50">
          <Button
            variant="secondary"
            onClick={() => onEdit(book)}
            className="flex-1 py-2.5 font-semibold hover:bg-teal-50 hover:text-teal-700 transition-all duration-200"
          >
            ✏️ Edit
          </Button>
          <Button
            variant="danger"
            onClick={() => onDelete(book.id)}
            className="flex-1 py-2.5 font-semibold hover:bg-red-50 hover:text-red-700 transition-all duration-200"
          >
            🗑️ Hapus
          </Button>
        </div>
      </div>
    </Card>
  );
}
