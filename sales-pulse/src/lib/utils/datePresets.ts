export type PresetKey = 'all' | 'thisMonth' | 'lastMonth' | 'thisQuarter' | 'thisYear' | 'lastYear';

export function getDateRange(preset: PresetKey): { from: string; to: string } {
  if (preset === 'all') return { from: '', to: '' };

  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth();

  switch (preset) {
    case 'thisMonth':
      return {
        from: `${y}-${String(m + 1).padStart(2, '0')}-01`,
        to: new Date(y, m + 1, 0).toISOString().split('T')[0],
      };
    case 'lastMonth': {
      const lm = m === 0 ? 11 : m - 1;
      const ly = m === 0 ? y - 1 : y;
      return {
        from: `${ly}-${String(lm + 1).padStart(2, '0')}-01`,
        to: new Date(ly, lm + 1, 0).toISOString().split('T')[0],
      };
    }
    case 'thisQuarter': {
      const qStart = Math.floor(m / 3) * 3;
      return {
        from: `${y}-${String(qStart + 1).padStart(2, '0')}-01`,
        to: new Date(y, qStart + 3, 0).toISOString().split('T')[0],
      };
    }
    case 'thisYear':
      return { from: `${y}-01-01`, to: `${y}-12-31` };
    case 'lastYear':
      return { from: `${y - 1}-01-01`, to: `${y - 1}-12-31` };
  }
}

export const PRESETS: { key: PresetKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'thisMonth', label: 'This Month' },
  { key: 'lastMonth', label: 'Last Month' },
  { key: 'thisQuarter', label: 'This Quarter' },
  { key: 'thisYear', label: 'This Year' },
  { key: 'lastYear', label: 'Last Year' },
];
