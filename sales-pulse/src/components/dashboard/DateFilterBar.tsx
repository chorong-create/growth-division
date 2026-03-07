'use client';

import { PRESETS, getDateRange, type PresetKey } from '@/lib/utils/datePresets';

interface DateFilterBarProps {
  from: string;
  to: string;
  activePreset: PresetKey;
  onDateChange: (from: string, to: string) => void;
  onPreset: (preset: PresetKey) => void;
}

export default function DateFilterBar({ from, to, activePreset, onDateChange, onPreset }: DateFilterBarProps) {
  function handlePreset(preset: PresetKey) {
    const range = getDateRange(preset);
    onDateChange(range.from, range.to);
    onPreset(preset);
  }

  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      <div className="flex flex-wrap gap-1.5">
        {PRESETS.map(p => (
          <button
            key={p.key}
            onClick={() => handlePreset(p.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activePreset === p.key
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <input
          type="date"
          value={from}
          onChange={e => { onDateChange(e.target.value, to); onPreset('' as PresetKey); }}
          className="px-2.5 py-1.5 border border-gray-200 rounded-lg text-xs bg-white"
        />
        <span className="text-gray-400 text-xs">~</span>
        <input
          type="date"
          value={to}
          onChange={e => { onDateChange(from, e.target.value); onPreset('' as PresetKey); }}
          className="px-2.5 py-1.5 border border-gray-200 rounded-lg text-xs bg-white"
        />
      </div>
    </div>
  );
}
