// Screen Reader Utilities
export function createLiveRegion(type: 'polite' | 'assertive' = 'polite'): HTMLElement {
  const region = document.createElement('div');
  region.setAttribute('role', 'status');
  region.setAttribute('aria-live', type);
  region.setAttribute('aria-atomic', 'true');
  region.className = 'sr-only';
  document.body.appendChild(region);
  return region;
}

export function announce(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
  const region = createLiveRegion(priority);
  setTimeout(() => { region.textContent = message; }, 100);
  setTimeout(() => region.remove(), 2000);
}

export function announceLoadingStart(action: string): void {
  announce('Dang ' + action + '...', 'polite');
}

export function announceLoadingEnd(action: string): void {
  announce(action + ' hoan tat', 'polite');
}

export function announceError(message: string): void {
  announce('Loi: ' + message, 'assertive');
}
