export function setupGlobalErrorHandler(): void {
  window.addEventListener('error', (e) => {
    console.error('[Global Error]', e.message, e.filename, e.lineno);
  });
  window.addEventListener('unhandledrejection', (e) => {
    console.error('[Unhandled Promise]', e.reason);
  });
}
export function safeExecute<T>(fn: () => T, fallback: T): T {
  try { return fn(); } catch (e) { console.error('[SafeExec]', e); return fallback; }
}
export async function safeAsync<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try { return await fn(); } catch (e) { console.error('[SafeAsync]', e); return fallback; }
}
