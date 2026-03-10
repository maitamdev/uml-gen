// Debounce Hook
export function useDebounce<T extends (...args: unknown[]) => void>(fn: T, delay: number) {
  let timer: ReturnType<typeof setTimeout> | null = null;

  function run(...args: Parameters<T>): void {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  }

  function cancel(): void {
    if (timer) { clearTimeout(timer); timer = null; }
  }

  function flush(...args: Parameters<T>): void {
    cancel();
    fn(...args);
  }

  return { run, cancel, flush };
}
