'use client';

export default function MobileHeader({ onToggle }: { onToggle: () => void }) {
  return (
    <header className="md:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 z-30 flex items-center px-4 gap-3">
      <button
        onClick={onToggle}
        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Toggle menu"
      >
        <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>
      <span className="text-base font-bold text-indigo-600">
        Sales<span className="text-gray-900">Pulse</span>
      </span>
    </header>
  );
}
