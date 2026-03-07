'use client';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { fmtFull } from '@/lib/utils/format';

ChartJS.register(ArcElement, Tooltip, Legend);

interface NewVsRenewalChartProps {
  newTotal: number;
  renewTotal: number;
}

export default function NewVsRenewalChart({ newTotal, renewTotal }: NewVsRenewalChartProps) {
  const data = {
    labels: ['New', 'Renewal'],
    datasets: [{
      data: [newTotal, renewTotal],
      backgroundColor: ['#3B82F6', '#4F46E5'],
      borderWidth: 0,
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: { font: { family: 'Pretendard', size: 13 }, padding: 20 },
      },
      tooltip: {
        callbacks: {
          label: (ctx: { label?: string; raw: unknown }) =>
            `${ctx.label}: ${fmtFull(ctx.raw as number)}`,
        },
      },
    },
  };

  const hasData = newTotal > 0 || renewTotal > 0;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">New vs Renewal</h3>
      <div className="h-64">
        {hasData ? (
          <Doughnut data={data} options={options} />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400 text-sm">No data</div>
        )}
      </div>
    </div>
  );
}
