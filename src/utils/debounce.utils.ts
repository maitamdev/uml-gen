// Debounce and throttle utilities
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delayMs: number
): T & { cancel: () => void } {
  let timer: ReturnType<typeof setTimeout> | null = null;
  const debounced = ((...args: unknown[]) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delayMs);
  }) as T & { cancel: () => void };
  debounced.cancel = () => { if (timer) clearTimeout(timer); };
  return debounced;
}

export function throttle<T extends (...args: unknown[]) => void>(
  fn: T,
  limitMs: number
): T {
  let lastCall = 0;
  return ((...args: unknown[]) => {
    const now = Date.now();
    if (now - lastCall >= limitMs) {
      lastCall = now;
      fn(...args);
    }
  }) as T;
}

export function rafThrottle<T extends (...args: unknown[]) => void>(fn: T): T {
  let rafId: number | null = null;
  return ((...args: unknown[]) => {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      fn(...args);
      rafId = null;
    });
  }) as T;
}
