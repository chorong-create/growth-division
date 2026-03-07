import * as XLSX from 'xlsx';

export function parseCSV(text: string): { headers: string[]; rows: string[][] } {
  const rows: string[][] = [];
  let current = '';
  let inQuotes = false;
  let row: string[] = [];

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '"') {
      if (inQuotes && text[i + 1] === '"') { current += '"'; i++; }
      else inQuotes = !inQuotes;
    } else if ((ch === ',' || ch === '\t') && !inQuotes) {
      row.push(current.trim());
      current = '';
    } else if ((ch === '\n' || ch === '\r') && !inQuotes) {
      row.push(current.trim());
      current = '';
      if (row.some(c => c !== '')) rows.push(row);
      row = [];
      if (ch === '\r' && text[i + 1] === '\n') i++;
    } else {
      current += ch;
    }
  }
  if (current || row.length) {
    row.push(current.trim());
    if (row.some(c => c !== '')) rows.push(row);
  }

  if (rows.length < 2) return { headers: [], rows: [] };
  return { headers: rows[0], rows: rows.slice(1) };
}

export function parseXLSX(buffer: ArrayBuffer): { headers: string[]; rows: string[][] } {
  const wb = XLSX.read(new Uint8Array(buffer), { type: 'array', cellDates: true });
  const json = XLSX.utils.sheet_to_json<string[]>(wb.Sheets[wb.SheetNames[0]], {
    header: 1,
    raw: false,
    dateNF: 'yyyy-mm-dd',
  });
  if (json.length < 2) return { headers: [], rows: [] };
  const headers = (json[0] as string[]).map(h => String(h || '').trim());
  const rows = json.slice(1).filter(row =>
    (row as string[]).some(c => c !== undefined && c !== '')
  ) as string[][];
  return { headers, rows };
}

export function parseDate(val: unknown): string {
  if (!val) return '';
  const s = String(val).trim();
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.substring(0, 10);
  if (/^\d{4}\/\d{1,2}\/\d{1,2}/.test(s)) {
    const [y, m, d] = s.split('/');
    return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
  }
  if (/^\d{1,2}\/\d{1,2}\/\d{4}/.test(s)) {
    const [a, b, y] = s.split('/');
    return `${y}-${a.padStart(2, '0')}-${b.padStart(2, '0')}`;
  }
  if (/^\d{4}\.\d{1,2}\.\d{1,2}/.test(s)) {
    const [y, m, d] = s.split('.');
    return `${y}-${m.trim().padStart(2, '0')}-${d.trim().padStart(2, '0')}`;
  }
  const d = new Date(s);
  if (!isNaN(d.getTime())) return d.toISOString().split('T')[0];
  return '';
}

export function normalizePlan(val: string): string {
  const v = val.toLowerCase().replace(/[\s_-]/g, '');
  if (v.includes('advance') || v.includes('어드밴스')) return 'Advance';
  if (v.includes('professional') || v.includes('prof') || v.includes('프로페셔널')) return 'Professional';
  if (v.includes('standard') || v.includes('스탠다드')) return 'Standard';
  return 'Basic';
}

export function normalizeDuration(val: string): string {
  const v = val.toLowerCase().replace(/[\s_-]/g, '');
  if (v.includes('month') || v.includes('월구독') || v.includes('월')) return 'Monthly';
  return 'Annual';
}

export function normalizeType(val: string): string {
  const v = val.toLowerCase().replace(/[\s_-]/g, '');
  if (v.includes('renew') || v.includes('재구독') || v.includes('재계약') || v.includes('갱신')) return 'Renewal';
  return 'New';
}

export function normalizeStatus(val: string): string {
  const v = val.toLowerCase().replace(/[\s_-]/g, '');
  if (v.includes('close') || v.includes('완료') || v.includes('체결') || v.includes('클로징')) return 'Closed';
  return 'In Progress';
}

export const FIELD_KEYWORDS: Record<string, string[]> = {
  account: ['account', 'company', 'client', 'customer', '기업', '회사', '고객', '거래처'],
  rep: ['rep', 'sales', 'owner', 'manager', '담당', '영업', '세일즈'],
  quote_date: ['quote', '견적', '제안'],
  close_date: ['close', 'closing', 'contract', 'signed', '계약', '체결', '클로징'],
  plan: ['plan', 'tier', 'product', '플랜', '상품', '등급'],
  amount: ['amount', 'total', 'price', 'revenue', 'value', '금액', '매출', '계약금', '총액', '가격'],
  months: ['period', 'month', 'duration', 'term', '기간', '개월'],
  duration: ['duration', 'subscription', 'subscribe', '구독', '연구독', '월구독'],
  type: ['type', 'category', '유형', '신규', '재구독', '구분'],
  status: ['status', 'stage', 'state', '상태', '단계'],
};

export function autoMatchColumn(headers: string[], fieldKey: string): number {
  const keywords = FIELD_KEYWORDS[fieldKey] || [];
  return headers.findIndex(h => {
    const lower = h.toLowerCase().replace(/[\s_-]/g, '');
    return keywords.some(k => lower.includes(k));
  });
}
