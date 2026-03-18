const marks: Map<string, number> = new Map();
export function startMeasure(label: string): void { marks.set(label, performance.now()); }
export function endMeasure(label: string): number {
  const start = marks.get(label);
  if (!start) return 0;
  const duration = performance.now() - start;
  marks.delete(label);
  console.debug('[Perf]', label, duration.toFixed(1) + 'ms');
  return duration;
}
export function measureAsync<T>(label: string, fn: () => Promise<T>): Promise<T> {
  startMeasure(label);
  return fn().finally(() => endMeasure(label));
}
export function getMemoryUsage(): number | null {
  const perf = performance as any;
  return perf.memory ? perf.memory.usedJSHeapSize : null;
}
