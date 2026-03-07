'use client';

import { useEffect, useState } from 'react';
import { autoMatchColumn } from '@/lib/utils/fileImport';

const FIELDS = [
  { key: 'account', label: 'Account Name *', required: true },
  { key: 'rep', label: 'Sales Rep *', required: true },
  { key: 'quote_date', label: 'Quote Date' },
  { key: 'close_date', label: 'Close Date' },
  { key: 'plan', label: 'Plan' },
  { key: 'amount', label: 'Total Amount *', required: true },
  { key: 'months', label: 'Months' },
  { key: 'duration', label: 'Duration' },
  { key: 'type', label: 'Type' },
  { key: 'status', label: 'Status' },
];

interface ColumnMappingProps {
  headers: string[];
  mapping: Record<string, string>;
  onMappingChange: (mapping: Record<string, string>) => void;
}

export default function ColumnMapping({ headers, mapping, onMappingChange }: ColumnMappingProps) {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (headers.length > 0 && !initialized) {
      const autoMap: Record<string, string> = {};
      FIELDS.forEach(f => {
        const idx = autoMatchColumn(headers, f.key);
        if (idx !== -1) autoMap[f.key] = String(idx);
      });
      onMappingChange(autoMap);
      setInitialized(true);
    }
  }, [headers]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {FIELDS.map(f => (
        <div key={f.key}>
          <label className="block text-xs font-medium text-gray-600 mb-1">{f.label}</label>
          <select
            value={mapping[f.key] || ''}
            onChange={e => onMappingChange({ ...mapping, [f.key]: e.target.value })}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">-- Skip --</option>
            {headers.map((h, i) => (
              <option key={i} value={String(i)}>{h}</option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}
