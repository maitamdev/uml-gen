export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): (...args: Parameters<T>) => void {
  let tid: ReturnType<typeof setTimeout>;
  return (...args) => { clearTimeout(tid); tid = setTimeout(() => fn(...args), delay); };
}
export function throttle<T extends (...args: any[]) => any>(fn: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle = false;
  return (...args) => { if (!inThrottle) { fn(...args); inThrottle = true; setTimeout(() => { inThrottle = false; }, limit); } };
}
export function delay(ms: number): Promise<void> { return new Promise(r => setTimeout(r, ms)); }
