// Global error handler
import { error as logError } from './logger';

export function setupGlobalErrorHandler(): void {
  window.addEventListener('error', (event) => {
    logError('Uncaught error: ' + event.message, {
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
    });
  });

  window.addEventListener('unhandledrejection', (event) => {
    logError('Unhandled promise rejection: ' + String(event.reason));
  });
}

export function wrapAsync<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  return fn().catch((err) => {
    logError('Async error caught: ' + String(err));
    return fallback;
  });
}
