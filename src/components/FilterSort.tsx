'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function FilterSort() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSort = (sortBy: string, sortOrder: 'asc' | 'desc') => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sortBy', sortBy);
    params.set('sortOrder', sortOrder);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
        <span className="text-sm font-medium text-gray-700">Urutkan:</span>
      </div>
      <select
        onChange={(e) => {
          const [sortBy, sortOrder] = e.target.value.split('-');
          handleSort(sortBy, sortOrder as 'asc' | 'desc');
        }}
        className="px-4 py-2.5 rounded-xl glass bg-white/80 backdrop-blur-sm text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-teal-400 focus:bg-white/90 transition-all duration-200 border border-gray-200/50 shadow-sm"
        defaultValue={`${searchParams.get('sortBy') || 'createdAt'}-${searchParams.get('sortOrder') || 'desc'}`}
      >
        <option value="createdAt-desc">📅 Terbaru Dulu</option>
        <option value="createdAt-asc">📅 Terlama Dulu</option>
        <option value="title-asc">📖 Judul A-Z</option>
        <option value="title-desc">📖 Judul Z-A</option>
        <option value="author-asc">👤 Penulis A-Z</option>
        <option value="author-desc">👤 Penulis Z-A</option>
        <option value="year-desc">📅 Tahun Terbaru</option>
        <option value="year-asc">📅 Tahun Terlama</option>
      </select>
    </div>
  );
}
