'use client';

import { createClient } from '@/lib/supabase/client';
import { Contract, ContractInsert } from '@/types/contract';

const supabase = createClient();

export function useContracts() {
  async function insert(data: ContractInsert) {
    const { data: user } = await supabase.auth.getUser();
    const { error } = await supabase.from('contracts').insert({
      ...data,
      created_by: user.user?.id,
    });
    if (error) throw error;
  }

  async function insertMany(rows: ContractInsert[]) {
    const { data: user } = await supabase.auth.getUser();
    const CHUNK = 500;
    for (let i = 0; i < rows.length; i += CHUNK) {
      const chunk = rows.slice(i, i + CHUNK).map(r => ({
        ...r,
        created_by: user.user?.id,
      }));
      const { error } = await supabase.from('contracts').insert(chunk);
      if (error) throw error;
    }
  }

  async function update(id: string, data: Partial<ContractInsert>) {
    const { error } = await supabase.from('contracts').update(data).eq('id', id);
    if (error) throw error;
  }

  async function remove(id: string) {
    const { error } = await supabase.from('contracts').delete().eq('id', id);
    if (error) throw error;
  }

  async function deleteAll() {
    const { error } = await supabase.from('contracts').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    if (error) throw error;
  }

  async function getById(id: string): Promise<Contract | null> {
    const { data, error } = await supabase.from('contracts').select('*').eq('id', id).single();
    if (error) return null;
    return data as Contract;
  }

  async function getAll(): Promise<Contract[]> {
    const { data, error } = await supabase.from('contracts').select('*').order('close_date', { ascending: false });
    if (error) throw error;
    return (data || []) as Contract[];
  }

  async function getFiltered(params: {
    from?: string;
    to?: string;
  }): Promise<Contract[]> {
    let query = supabase.from('contracts').select('*').order('close_date', { ascending: false });
    if (params.from) query = query.gte('close_date', params.from);
    if (params.to) query = query.lte('close_date', params.to);
    const { data, error } = await query;
    if (error) throw error;
    return (data || []) as Contract[];
  }

  async function getPaginated(params: {
    page: number;
    size: number;
    search?: string;
    status?: string;
    type?: string;
  }): Promise<{ data: Contract[]; total: number }> {
    const from = (params.page - 1) * params.size;
    const to = from + params.size - 1;

    let countQuery = supabase.from('contracts').select('*', { count: 'exact', head: true });
    let dataQuery = supabase.from('contracts').select('*').order('close_date', { ascending: false }).range(from, to);

    if (params.search) {
      const search = `%${params.search}%`;
      countQuery = countQuery.or(`account.ilike.${search},rep.ilike.${search},plan.ilike.${search}`);
      dataQuery = dataQuery.or(`account.ilike.${search},rep.ilike.${search},plan.ilike.${search}`);
    }
    if (params.status && params.status !== 'all') {
      countQuery = countQuery.eq('status', params.status);
      dataQuery = dataQuery.eq('status', params.status);
    }
    if (params.type && params.type !== 'all') {
      countQuery = countQuery.eq('type', params.type);
      dataQuery = dataQuery.eq('type', params.type);
    }

    const [countResult, dataResult] = await Promise.all([countQuery, dataQuery]);
    if (dataResult.error) throw dataResult.error;

    return {
      data: (dataResult.data || []) as Contract[],
      total: countResult.count || 0,
    };
  }

  async function getAllFiltered(params: {
    search?: string;
    status?: string;
    type?: string;
  }): Promise<Contract[]> {
    let query = supabase.from('contracts').select('*').order('close_date', { ascending: false });

    if (params.search) {
      const search = `%${params.search}%`;
      query = query.or(`account.ilike.${search},rep.ilike.${search},plan.ilike.${search}`);
    }
    if (params.status && params.status !== 'all') {
      query = query.eq('status', params.status);
    }
    if (params.type && params.type !== 'all') {
      query = query.eq('type', params.type);
    }

    const { data, error } = await query;
    if (error) throw error;
    return (data || []) as Contract[];
  }

  return { insert, insertMany, update, remove, deleteAll, getById, getAll, getFiltered, getPaginated, getAllFiltered };
}
