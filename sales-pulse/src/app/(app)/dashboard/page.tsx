'use client';

import { useState, useEffect, useCallback } from 'react';
import { useContracts } from '@/hooks/useContracts';
import { calculateKPIs, getTopReps, getMonthlyTrend } from '@/lib/utils/calculations';
import { type PresetKey } from '@/lib/utils/datePresets';
import { Contract } from '@/types/contract';
import DateFilterBar from '@/components/dashboard/DateFilterBar';
import KpiGrid from '@/components/dashboard/KpiGrid';
import MonthlyTrendChart from '@/components/dashboard/MonthlyTrendChart';
import NewVsRenewalChart from '@/components/dashboard/NewVsRenewalChart';
import ClosedDealsTable from '@/components/dashboard/ClosedDealsTable';
import ForecastingTable from '@/components/dashboard/ForecastingTable';
import TopSalesReps from '@/components/dashboard/TopSalesReps';

export default function DashboardPage() {
  const { getFiltered } = useContracts();
  const [data, setData] = useState<Contract[]>([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [activePreset, setActivePreset] = useState<PresetKey>('all');
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const contracts = await getFiltered({ from: from || undefined, to: to || undefined });
      setData(contracts);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [from, to]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const kpis = calculateKPIs(data);
  const topReps = getTopReps(kpis.closed);
  const trend = getMonthlyTrend(kpis.closed);

  const newTotal = data.reduce((s, d) => s + (d.type === 'New' ? d.amount : 0), 0);
  const renewTotal = data.reduce((s, d) => s + (d.type === 'Renewal' ? d.amount : 0), 0);

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-900 mb-4">Dashboard</h1>

      <DateFilterBar
        from={from}
        to={to}
        activePreset={activePreset}
        onDateChange={(f, t) => { setFrom(f); setTo(t); }}
        onPreset={setActivePreset}
      />

      {loading ? (
        <div className="text-center text-gray-400 py-12">Loading...</div>
      ) : (
        <div className="space-y-6">
          <KpiGrid {...kpis} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <MonthlyTrendChart {...trend} />
            </div>
            <NewVsRenewalChart newTotal={newTotal} renewTotal={renewTotal} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ClosedDealsTable rows={kpis.closed} />
            <ForecastingTable rows={kpis.pipeline} />
            <TopSalesReps reps={topReps} />
          </div>
        </div>
      )}
    </div>
  );
}
