'use client';

import { fmtFull } from '@/lib/utils/format';

interface Rep {
  name: string;
  amount: number;
}

export default function TopSalesReps({ reps }: { reps: Rep[] }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">Top Sales Reps</h3>
      {reps.length === 0 ? (
        <div className="text-center text-gray-400 text-sm py-6">No data yet</div>
      ) : (
        <div className="space-y-3">
          {reps.map((rep, i) => (
            <div key={rep.name} className="flex items-center gap-3">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  i === 0 ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-500'
                }`}
              >
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 truncate">{rep.name}</div>
                <div className="text-xs text-gray-400">{fmtFull(rep.amount)}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
