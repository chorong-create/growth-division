import * as XLSX from 'xlsx';
import { Contract } from '@/types/contract';

export function exportToExcel(
  contracts: Contract[],
  kpis?: { totalARR: number; currentMRR: number; newExpectedMRR: number; projectedMRR: number }
) {
  const wb = XLSX.utils.book_new();

  // Records sheet
  const recordsData = contracts.map(c => ({
    Account: c.account,
    'Sales Rep': c.rep,
    Plan: c.plan,
    Duration: c.duration,
    Type: c.type,
    'Total Amount': c.amount,
    Months: c.months,
    MRR: Math.round(c.amount / c.months),
    'Quote Date': c.quote_date,
    'Close Date': c.close_date,
    Status: c.status,
  }));
  const ws1 = XLSX.utils.json_to_sheet(recordsData);
  XLSX.utils.book_append_sheet(wb, ws1, 'Records');

  // KPI Summary sheet
  if (kpis) {
    const kpiData = [
      { Metric: 'Total ARR', Value: kpis.totalARR },
      { Metric: 'Current MRR', Value: kpis.currentMRR },
      { Metric: 'New Expected MRR', Value: kpis.newExpectedMRR },
      { Metric: 'Projected MRR', Value: kpis.projectedMRR },
    ];
    const ws2 = XLSX.utils.json_to_sheet(kpiData);
    XLSX.utils.book_append_sheet(wb, ws2, 'KPI Summary');
  }

  XLSX.writeFile(wb, `sales-pulse-export-${new Date().toISOString().split('T')[0]}.xlsx`);
}
