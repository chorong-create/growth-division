'use client';

interface KpiCardProps {
  title: string;
  value: string;
  subtitle: string;
  color: string;
}

export default function KpiCard({ title, value, subtitle, color }: KpiCardProps) {
  const colorMap: Record<string, string> = {
    indigo: 'border-l-indigo-600',
    emerald: 'border-l-emerald-500',
    amber: 'border-l-amber-500',
    blue: 'border-l-blue-500',
  };

  return (
    <div className={`bg-white rounded-xl border border-gray-200 p-5 border-l-4 ${colorMap[color] || 'border-l-indigo-600'}`}>
      <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">{title}</div>
      <div className="text-xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-xs text-gray-400">{subtitle}</div>
    </div>
  );
}
