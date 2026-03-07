'use client';

import { Contract } from '@/types/contract';
import { fmtFull } from '@/lib/utils/format';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

interface RecordsTableProps {
  records: Contract[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function RecordsTable({ records, onEdit, onDelete }: RecordsTableProps) {
  if (records.length === 0) {
    return (
      <div className="text-center text-gray-400 py-12 text-sm">
        No records found
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 text-left text-xs text-gray-500">
            <th className="pb-3 font-medium">Account</th>
            <th className="pb-3 font-medium">Rep</th>
            <th className="pb-3 font-medium">Plan</th>
            <th className="pb-3 font-medium">Duration</th>
            <th className="pb-3 font-medium">Type</th>
            <th className="pb-3 font-medium text-right">Amount</th>
            <th className="pb-3 font-medium text-right">Months</th>
            <th className="pb-3 font-medium text-right">MRR</th>
            <th className="pb-3 font-medium">Quote Date</th>
            <th className="pb-3 font-medium">Close Date</th>
            <th className="pb-3 font-medium">Status</th>
            <th className="pb-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map(d => (
            <tr key={d.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-2.5 font-medium">{d.account}</td>
              <td className="py-2.5">{d.rep}</td>
              <td className="py-2.5">{d.plan || '-'}</td>
              <td className="py-2.5">{d.duration || '-'}</td>
              <td className="py-2.5"><Badge label={d.type} /></td>
              <td className="py-2.5 text-right">{fmtFull(d.amount)}</td>
              <td className="py-2.5 text-right">{d.months}mo</td>
              <td className="py-2.5 text-right">{fmtFull(Math.round(d.amount / d.months))}</td>
              <td className="py-2.5">{d.quote_date}</td>
              <td className="py-2.5">{d.close_date}</td>
              <td className="py-2.5"><Badge label={d.status} /></td>
              <td className="py-2.5">
                <div className="flex gap-1">
                  <Button size="sm" variant="secondary" onClick={() => onEdit(d.id)}>Edit</Button>
                  <Button size="sm" variant="danger" onClick={() => onDelete(d.id)}>Del</Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
