export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
export function lerp(a: number, b: number, t: number): number { return a + (b - a) * t; }
export function formatNumber(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n.toString();
}
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function percentage(value: number, total: number): number {
  return total === 0 ? 0 : Math.round((value / total) * 100);
}
