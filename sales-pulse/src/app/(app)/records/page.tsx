'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useContracts } from '@/hooks/useContracts';
import { useToast } from '@/hooks/useToast';
import { calculateKPIs } from '@/lib/utils/calculations';
import { exportToExcel } from '@/lib/utils/exportData';
import { PAGE_SIZE } from '@/lib/constants';
import { Contract } from '@/types/contract';
import RecordsControls from '@/components/records/RecordsControls';
import RecordsTable from '@/components/records/RecordsTable';
import Pagination from '@/components/records/Pagination';
import Toast from '@/components/layout/Toast';

export default function RecordsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { getPaginated, getAllFiltered, remove, deleteAll } = useContracts();
  const { message, visible, showToast } = useToast();

  const [records, setRecords] = useState<Contract[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  const page = Number(searchParams.get('page') || '1');
  const search = searchParams.get('search') || '';
  const status = searchParams.get('status') || 'all';
  const type = searchParams.get('type') || 'all';

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getPaginated({ page, size: PAGE_SIZE, search, status, type });
      setRecords(result.data);
      setTotal(result.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page, search, status, type]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function updateParams(updates: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([k, v]) => {
      if (v && v !== 'all' && v !== '1') params.set(k, v);
      else params.delete(k);
    });
    // Reset to page 1 when filters change
    if (!updates.page) params.delete('page');
    router.push(`/records?${params.toString()}`);
  }

  function handleEdit(id: string) {
    router.push(`/entry?edit=${id}`);
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this record?')) return;
    try {
      await remove(id);
      showToast('Record deleted');
      fetchData();
    } catch (err) {
      showToast('Delete failed: ' + (err instanceof Error ? err.message : ''));
    }
  }

  async function handleClearAll() {
    if (!confirm('Delete ALL records? This cannot be undone.')) return;
    try {
      await deleteAll();
      showToast('All data cleared');
      fetchData();
    } catch (err) {
      showToast('Clear failed: ' + (err instanceof Error ? err.message : ''));
    }
  }

  async function handleExport() {
    setExporting(true);
    try {
      const allData = await getAllFiltered({ search, status, type });
      const kpis = calculateKPIs(allData);
      exportToExcel(allData, {
        totalARR: kpis.totalARR,
        currentMRR: kpis.currentMRR,
        newExpectedMRR: kpis.newExpectedMRR,
        projectedMRR: kpis.projectedMRR,
      });
      showToast('Export downloaded');
    } catch (err) {
      showToast('Export failed: ' + (err instanceof Error ? err.message : ''));
    } finally {
      setExporting(false);
    }
  }

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-900 mb-4">Records</h1>

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <RecordsControls
          search={search}
          status={status}
          type={type}
          onSearchChange={val => updateParams({ search: val })}
          onStatusChange={val => updateParams({ status: val })}
          onTypeChange={val => updateParams({ type: val })}
          onExport={handleExport}
          onClearAll={handleClearAll}
          exporting={exporting}
        />

        {loading ? (
          <div className="text-center text-gray-400 py-12 text-sm">Loading...</div>
        ) : (
          <>
            <div className="text-xs text-gray-400 mb-3">{total} records total</div>
            <RecordsTable records={records} onEdit={handleEdit} onDelete={handleDelete} />
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={p => updateParams({ page: String(p) })}
            />
          </>
        )}
      </div>

      <Toast message={message} visible={visible} />
    </div>
  );
}
