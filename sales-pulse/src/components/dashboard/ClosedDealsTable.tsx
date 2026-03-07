'use client';

import { Contract } from '@/types/contract';
import { fmtFull } from '@/lib/utils/format';

export default function ClosedDealsTable({ rows }: { rows: Contract[] }) {
  const totalAmt = rows.reduce((s, d) => s + d.amount, 0);
  const totalMRR = rows.reduce((s, d) => s + d.amount / d.months, 0);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">Closed Deals</h3>
      {rows.length === 0 ? (
        <div className="text-center text-gray-400 text-sm py-6">No data</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left text-xs text-gray-500">
                <th className="pb-2 font-medium">Account</th>
                <th className="pb-2 font-medium">Plan</th>
                <th className="pb-2 font-medium text-right">Amount</th>
                <th className="pb-2 font-medium text-right">MRR</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(d => (
                <tr key={d.id} className="border-b border-gray-50">
                  <td className="py-2">{d.account}</td>
                  <td className="py-2">{d.plan || '-'}</td>
                  <td className="py-2 text-right">{fmtFull(d.amount)}</td>
                  <td className="py-2 text-right">{fmtFull(Math.round(d.amount / d.months))}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="font-semibold">
                <td className="pt-2" colSpan={2}>Total ({rows.length})</td>
                <td className="pt-2 text-right">{fmtFull(totalAmt)}</td>
                <td className="pt-2 text-right">{fmtFull(Math.round(totalMRR))}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
}
