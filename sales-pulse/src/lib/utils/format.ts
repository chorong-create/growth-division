export function fmtKRW(n: number): string {
  return Number(n).toLocaleString('ko-KR') + ' 원';
}

export function fmtFull(n: number): string {
  return Number(n).toLocaleString('ko-KR') + ' 원';
}
