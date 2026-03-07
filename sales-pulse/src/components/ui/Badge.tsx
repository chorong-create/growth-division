const VARIANTS: Record<string, string> = {
  closed: 'bg-emerald-50 text-emerald-700',
  'in progress': 'bg-amber-50 text-amber-700',
  new: 'bg-blue-50 text-blue-700',
  renewal: 'bg-indigo-50 text-indigo-700',
};

export default function Badge({ label }: { label: string }) {
  const cls = VARIANTS[label.toLowerCase()] || 'bg-gray-100 text-gray-600';
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${cls}`}>
      {label}
    </span>
  );
}
