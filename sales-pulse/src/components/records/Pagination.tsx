'use client';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | string)[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= page - 2 && i <= page + 2)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...');
    }
  }

  return (
    <div className="flex items-center justify-center gap-1 mt-4">
      <button
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="px-2.5 py-1.5 text-xs rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40"
      >
        Prev
      </button>
      {pages.map((p, i) =>
        typeof p === 'string' ? (
          <span key={i} className="px-2 text-xs text-gray-400">...</span>
        ) : (
          <button
            key={i}
            onClick={() => onPageChange(p)}
            className={`px-2.5 py-1.5 text-xs rounded-lg ${
              p === page ? 'bg-indigo-600 text-white' : 'border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {p}
          </button>
        )
      )}
      <button
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="px-2.5 py-1.5 text-xs rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}
