'use client';

import KpiCard from './KpiCard';
import { fmtKRW } from '@/lib/utils/format';

interface KpiGridProps {
  totalARR: number;
  currentMRR: number;
  newExpectedMRR: number;
  projectedMRR: number;
  closedCount: number;
  pipelineCount: number;
}

export default function KpiGrid({
  totalARR, currentMRR, newExpectedMRR, projectedMRR, closedCount, pipelineCount,
}: KpiGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <KpiCard title="Total ARR" value={fmtKRW(totalARR)} subtitle={`${closedCount} closed contracts`} color="indigo" />
      <KpiCard title="Current MRR" value={fmtKRW(currentMRR)} subtitle="Closed contracts" color="emerald" />
      <KpiCard title="New Expected MRR" value={fmtKRW(newExpectedMRR)} subtitle={`${pipelineCount} opportunities (Forecasting A)`} color="amber" />
      <KpiCard title="Projected MRR" value={fmtKRW(projectedMRR)} subtitle="Current + Expected (Forecasting B)" color="blue" />
    </div>
  );
}
