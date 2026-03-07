'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { fmtKRW, fmtFull } from '@/lib/utils/format';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface MonthlyTrendChartProps {
  labels: string[];
  newValues: number[];
  renewValues: number[];
}

export default function MonthlyTrendChart({ labels, newValues, renewValues }: MonthlyTrendChartProps) {
  const data = {
    labels,
    datasets: [
      {
        label: 'New',
        data: newValues,
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
        borderRadius: 4,
        barPercentage: 0.6,
      },
      {
        label: 'Renewal',
        data: renewValues,
        backgroundColor: 'rgba(79, 70, 229, 0.5)',
        borderRadius: 4,
        barPercentage: 0.6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' as const, labels: { font: { family: 'Pretendard', size: 12 } } },
      tooltip: {
        callbacks: {
          label: (ctx: { dataset: { label?: string }; raw: unknown }) =>
            `${ctx.dataset.label}: ${fmtFull(ctx.raw as number)}`,
        },
      },
    },
    scales: {
      x: { stacked: true, grid: { display: false }, ticks: { font: { family: 'Pretendard' } } },
      y: {
        stacked: true,
        beginAtZero: true,
        ticks: {
          callback: (v: string | number) => fmtKRW(Number(v)),
          font: { family: 'Pretendard' },
        },
        grid: { color: '#F3F4F6' },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">Monthly Trend (New vs Renewal)</h3>
      <div className="h-64">
        {labels.length > 0 ? (
          <Bar data={data} options={options} />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400 text-sm">No data</div>
        )}
      </div>
    </div>
  );
}
