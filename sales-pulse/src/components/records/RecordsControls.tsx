'use client';

import Button from '@/components/ui/Button';

interface RecordsControlsProps {
  search: string;
  status: string;
  type: string;
  onSearchChange: (val: string) => void;
  onStatusChange: (val: string) => void;
  onTypeChange: (val: string) => void;
  onExport: () => void;
  onClearAll: () => void;
  exporting: boolean;
}

export default function RecordsControls({
  search, status, type,
  onSearchChange, onStatusChange, onTypeChange,
  onExport, onClearAll, exporting,
}: RecordsControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-4">
      <input
        type="text"
        placeholder="Search account, rep, plan..."
        value={search}
        onChange={e => onSearchChange(e.target.value)}
        className="px-3 py-2 border border-gray-200 rounded-lg text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <select
        value={status}
        onChange={e => onStatusChange(e.target.value)}
        className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="all">All Status</option>
        <option value="Closed">Closed</option>
        <option value="In Progress">In Progress</option>
      </select>
      <select
        value={type}
        onChange={e => onTypeChange(e.target.value)}
        className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="all">All Types</option>
        <option value="New">New</option>
        <option value="Renewal">Renewal</option>
      </select>
      <div className="flex gap-2 ml-auto">
        <Button variant="secondary" onClick={onExport} disabled={exporting}>
          {exporting ? 'Exporting...' : 'Export'}
        </Button>
        <Button variant="danger" onClick={onClearAll}>Clear All</Button>
      </div>
    </div>
  );
}
