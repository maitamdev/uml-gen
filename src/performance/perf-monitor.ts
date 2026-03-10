// Performance monitoring utilities
export class PerfMonitor {
  private marks: Map<string, number> = new Map();

  mark(name: string): void {
    this.marks.set(name, performance.now());
  }

  measure(name: string, startMark: string): number {
    const start = this.marks.get(startMark);
    if (!start) return -1;
    const duration = performance.now() - start;
    console.debug('[perf]', name, duration.toFixed(2) + 'ms');
    return duration;
  }

  clear(): void {
    this.marks.clear();
  }
}

export const perfMonitor = new PerfMonitor();
