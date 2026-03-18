export function setAriaLabel(el: HTMLElement, label: string): void { el.setAttribute('aria-label', label); }
export function setAriaExpanded(el: HTMLElement, expanded: boolean): void { el.setAttribute('aria-expanded', String(expanded)); }
export function setAriaHidden(el: HTMLElement, hidden: boolean): void { el.setAttribute('aria-hidden', String(hidden)); }
export function announceToScreenReader(message: string): void {
  const el = document.createElement('div');
  el.setAttribute('role', 'status'); el.setAttribute('aria-live', 'polite');
  el.className = 'sr-only'; el.textContent = message;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1000);
}
export function trapFocus(container: HTMLElement): () => void {
  const focusable = container.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  const first = focusable[0]; const last = focusable[focusable.length - 1];
  const handler = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
  };
  container.addEventListener('keydown', handler);
  return () => container.removeEventListener('keydown', handler);
}
