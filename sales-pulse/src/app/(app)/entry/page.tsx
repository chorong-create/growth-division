'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useContracts } from '@/hooks/useContracts';
import { useToast } from '@/hooks/useToast';
import { parseDate, normalizePlan, normalizeDuration, normalizeType, normalizeStatus } from '@/lib/utils/fileImport';
import { ContractInsert } from '@/types/contract';
import ManualEntryForm from '@/components/entry/ManualEntryForm';
import FileUploadZone from '@/components/entry/FileUploadZone';
import ColumnMapping from '@/components/entry/ColumnMapping';
import ImportPreview from '@/components/entry/ImportPreview';
import Toast from '@/components/layout/Toast';
import Button from '@/components/ui/Button';

export default function EntryPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const editId = searchParams.get('edit');
  const { insertMany } = useContracts();
  const { message, visible, showToast } = useToast();

  const [importHeaders, setImportHeaders] = useState<string[]>([]);
  const [importRows, setImportRows] = useState<string[][]>([]);
  const [mapping, setMapping] = useState<Record<string, string>>({});
  const [importing, setImporting] = useState(false);

  function handleFileLoaded(headers: string[], rows: string[][]) {
    setImportHeaders(headers);
    setImportRows(rows);
    setMapping({});
  }

  function cancelImport() {
    setImportHeaders([]);
    setImportRows([]);
    setMapping({});
  }

  async function executeImport() {
    if (!mapping.account || !mapping.rep || !mapping.amount) {
      showToast('Account Name, Sales Rep, and Total Amount are required');
      return;
    }

    setImporting(true);
    const today = new Date().toISOString().split('T')[0];
    const records: ContractInsert[] = [];
    let skipped = 0;

    for (const row of importRows) {
      const account = String(row[Number(mapping.account)] || '').trim();
      const rep = String(row[Number(mapping.rep)] || '').trim();
      const rawAmount = String(row[Number(mapping.amount)] || '').trim();

      if (!account || !rep || !rawAmount) { skipped++; continue; }

      const amount = Number(rawAmount.replace(/[^0-9.-]/g, ''));
      if (isNaN(amount) || amount <= 0) { skipped++; continue; }

      const quoteDate = mapping.quote_date ? (parseDate(row[Number(mapping.quote_date)]) || today) : today;
      const closeDate = mapping.close_date ? (parseDate(row[Number(mapping.close_date)]) || today) : today;
      const plan = mapping.plan ? normalizePlan(String(row[Number(mapping.plan)] || '')) : 'Basic';
      const months = mapping.months ? (Number(String(row[Number(mapping.months)] || '12').replace(/[^0-9]/g, '')) || 12) : 12;
      const duration = mapping.duration ? normalizeDuration(String(row[Number(mapping.duration)] || '')) : (months >= 12 ? 'Annual' : 'Monthly');
      const type = mapping.type ? normalizeType(String(row[Number(mapping.type)] || '')) : 'New';
      const status = mapping.status ? normalizeStatus(String(row[Number(mapping.status)] || '')) : 'Closed';

      records.push({
        account, rep, quote_date: quoteDate, close_date: closeDate,
        plan: plan as ContractInsert['plan'],
        duration: duration as ContractInsert['duration'],
        type: type as ContractInsert['type'],
        status: status as ContractInsert['status'],
        amount, months,
      });
    }

    try {
      await insertMany(records);
      cancelImport();
      showToast(`${records.length} records imported${skipped > 0 ? `, ${skipped} skipped` : ''}`);
    } catch (err) {
      showToast('Import error: ' + (err instanceof Error ? err.message : 'Unknown'));
    } finally {
      setImporting(false);
    }
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-900 mb-4">Data Entry</h1>

      <div className="space-y-6">
        {/* File Import */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Import from File</h3>
          <FileUploadZone onFileLoaded={handleFileLoaded} onError={showToast} />

          {importHeaders.length > 0 && (
            <div className="mt-5 space-y-4">
              <ImportPreview headers={importHeaders} rows={importRows} />
              <h4 className="text-sm font-semibold text-gray-900">Column Mapping</h4>
              <ColumnMapping headers={importHeaders} mapping={mapping} onMappingChange={setMapping} />
              <div className="flex gap-2">
                <Button onClick={executeImport} disabled={importing}>
                  {importing ? 'Importing...' : `Import ${importRows.length} Records`}
                </Button>
                <Button variant="secondary" onClick={cancelImport}>Cancel</Button>
              </div>
            </div>
          )}
        </div>

        {/* Manual Entry */}
        <ManualEntryForm
          editId={editId}
          onSaved={() => {
            if (editId) router.push('/entry');
          }}
          onToast={showToast}
        />
      </div>

      <Toast message={message} visible={visible} />
    </div>
  );
}
