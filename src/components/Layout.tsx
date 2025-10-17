import SearchBar from './SearchBar';
import FilterSort from './FilterSort';
import Button from './ui/Button';

interface LayoutProps {
  children: React.ReactNode;
  onAddBook: () => void;
}

export default function Layout({ children, onAddBook }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 p-4 md:p-8">
      <header className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          <div className="text-center md:text-left">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Sistem Manajemen Buku
            </h1>
            <p className="text-gray-600 text-lg">Kelola koleksi buku Anda dengan mudah dan elegan</p>
          </div>
          <Button
            onClick={onAddBook}
            className="px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600"
          >
            ➕ Tambah Buku Baru
          </Button>
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 p-6 rounded-2xl glass bg-white/60 backdrop-blur-md shadow-lg border border-white/20">
          <SearchBar />
          <FilterSort />
        </div>
      </header>
      <main className="animate-fade-in">
        {children}
      </main>
    </div>
  );
}
