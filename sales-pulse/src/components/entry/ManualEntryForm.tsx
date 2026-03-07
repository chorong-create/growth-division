'use client';

import { useState, useEffect } from 'react';
import { useContracts } from '@/hooks/useContracts';
import { Contract, ContractInsert } from '@/types/contract';
import { PLAN_OPTIONS, DURATION_OPTIONS, TYPE_OPTIONS, STATUS_OPTIONS } from '@/lib/constants';
import Button from '@/components/ui/Button';

interface ManualEntryFormProps {
  editId?: string | null;
  onSaved: () => void;
  onToast: (msg: string) => void;
}

export default function ManualEntryForm({ editId, onSaved, onToast }: ManualEntryFormProps) {
  const { insert, update, getById } = useContracts();
  const today = new Date().toISOString().split('T')[0];

  const [form, setForm] = useState({
    account: '',
    rep: '',
    quote_date: today,
    close_date: today,
    plan: 'Basic' as string,
    duration: 'Annual' as string,
    type: 'New' as string,
    status: 'Closed' as string,
    amount: '',
    months: '12',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editId) {
      getById(editId).then((contract: Contract | null) => {
        if (contract) {
          setForm({
            account: contract.account,
            rep: contract.rep,
            quote_date: contract.quote_date,
            close_date: contract.close_date,
            plan: contract.plan,
            duration: contract.duration,
            type: contract.type,
            status: contract.status,
            amount: String(contract.amount),
            months: String(contract.months),
          });
        }
      });
    }
  }, [editId]); // eslint-disable-line react-hooks/exhaustive-deps

  function resetForm() {
    setForm({
      account: '',
      rep: '',
      quote_date: today,
      close_date: today,
      plan: 'Basic',
      duration: 'Annual',
      type: 'New',
      status: 'Closed',
      amount: '',
      months: '12',
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const data: ContractInsert = {
      account: form.account.trim(),
      rep: form.rep.trim(),
      quote_date: form.quote_date,
      close_date: form.close_date,
      plan: form.plan as ContractInsert['plan'],
      duration: form.duration as ContractInsert['duration'],
      type: form.type as ContractInsert['type'],
      status: form.status as ContractInsert['status'],
      amount: Number(form.amount),
      months: Number(form.months),
    };

    try {
      if (editId) {
        await update(editId, data);
        onToast('Contract updated');
      } else {
        await insert(data);
        onToast('Contract saved');
      }
      resetForm();
      onSaved();
    } catch (err) {
      onToast('Error: ' + (err instanceof Error ? err.message : 'Save failed'));
    } finally {
      setLoading(false);
    }
  }

  function setField(key: string, value: string) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">
        {editId ? 'Edit Contract' : 'New Contract'}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Account Name *</label>
            <input
              required
              value={form.account}
              onChange={e => setField('account', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Sales Rep *</label>
            <input
              required
              value={form.rep}
              onChange={e => setField('rep', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Quote Date</label>
            <input
              type="date"
              value={form.quote_date}
              onChange={e => setField('quote_date', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Close Date</label>
            <input
              type="date"
              value={form.close_date}
              onChange={e => setField('close_date', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Plan</label>
            <select
              value={form.plan}
              onChange={e => setField('plan', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {PLAN_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Duration</label>
            <select
              value={form.duration}
              onChange={e => setField('duration', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {DURATION_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Type</label>
            <select
              value={form.type}
              onChange={e => setField('type', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {TYPE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Status</label>
            <select
              value={form.status}
              onChange={e => setField('status', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {STATUS_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Total Amount (원) *</label>
            <input
              type="number"
              required
              min={0}
              value={form.amount}
              onChange={e => setField('amount', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Months *</label>
            <input
              type="number"
              required
              min={1}
              value={form.months}
              onChange={e => setField('months', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : editId ? 'Update Contract' : 'Save Contract'}
          </Button>
          {editId && (
            <Button type="button" variant="secondary" onClick={() => { resetForm(); onSaved(); }}>
              Cancel
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
