export function unique<T>(arr: T[]): T[] { return [...new Set(arr)]; }
export function groupBy<T>(arr: T[], key: keyof T): Record<string, T[]> {
  return arr.reduce((acc, item) => {
    const k = String(item[key]); (acc[k] = acc[k] || []).push(item); return acc;
  }, {} as Record<string, T[]>);
}
export function chunk<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) chunks.push(arr.slice(i, i + size));
  return chunks;
}
export function sortBy<T>(arr: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] {
  return [...arr].sort((a, b) => {
    const va = a[key], vb = b[key];
    const cmp = va < vb ? -1 : va > vb ? 1 : 0;
    return order === 'asc' ? cmp : -cmp;
  });
}
export function last<T>(arr: T[]): T | undefined { return arr[arr.length - 1]; }
export function isEmpty<T>(arr: T[]): boolean { return arr.length === 0; }
