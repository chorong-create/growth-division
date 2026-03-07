import { Contract } from '@/types/contract';

export function calculateKPIs(data: Contract[]) {
  const closed = data.filter(d => d.status === 'Closed');
  const pipeline = data.filter(d => d.status === 'In Progress');

  const totalARR = closed.reduce((s, d) => s + d.amount, 0);
  const currentMRR = closed.reduce((s, d) => s + d.amount / d.months, 0);
  const newExpectedMRR = pipeline.reduce((s, d) => s + d.amount / d.months, 0);
  const projectedMRR = currentMRR + newExpectedMRR;

  return {
    totalARR,
    currentMRR: Math.round(currentMRR),
    newExpectedMRR: Math.round(newExpectedMRR),
    projectedMRR: Math.round(projectedMRR),
    closedCount: closed.length,
    pipelineCount: pipeline.length,
    closed,
    pipeline,
  };
}

export function getTopReps(closed: Contract[], limit = 5) {
  const repMap: Record<string, number> = {};
  closed.forEach(d => {
    repMap[d.rep] = (repMap[d.rep] || 0) + d.amount;
  });
  return Object.entries(repMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([name, amount]) => ({ name, amount }));
}

export function getMonthlyTrend(closed: Contract[]) {
  const monthMap: Record<string, { newAmt: number; renewAmt: number }> = {};
  closed.forEach(d => {
    const m = d.close_date.substring(0, 7);
    if (!monthMap[m]) monthMap[m] = { newAmt: 0, renewAmt: 0 };
    if (d.type === 'Renewal') monthMap[m].renewAmt += d.amount;
    else monthMap[m].newAmt += d.amount;
  });

  const months = Object.keys(monthMap).sort();
  return {
    labels: months.map(m => {
      const [y, mo] = m.split('-');
      return `${mo}/${y.slice(2)}`;
    }),
    newValues: months.map(m => monthMap[m].newAmt),
    renewValues: months.map(m => monthMap[m].renewAmt),
  };
}
