import { setupGlobalErrorHandler } from './error-boundary';
import { initTheme } from './theme-manager';
import { logVersion } from './version';
import { injectPrintStyles } from './print-styles';

export function bootstrapApp(): void {
  setupGlobalErrorHandler();
  initTheme();
  logVersion();
  injectPrintStyles();
  console.log('[App] Bootstrapped successfully');
}
