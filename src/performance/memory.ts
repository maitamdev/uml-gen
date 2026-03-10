// Memory management utilities
export function cleanupEventListeners(element: HTMLElement): void {
  const clone = element.cloneNode(true) as HTMLElement;
  element.parentNode?.replaceChild(clone, element);
}

export function revokeObjectURLs(urls: string[]): void {
  urls.forEach(url => URL.revokeObjectURL(url));
}

export function getMemoryUsage(): { used: number; total: number } | null {
  const perf = performance as unknown as { memory?: { usedJSHeapSize: number; totalJSHeapSize: number } };
  if (!perf.memory) return null;
  return {
    used: Math.round(perf.memory.usedJSHeapSize / 1048576),
    total: Math.round(perf.memory.totalJSHeapSize / 1048576),
  };
}
