let previousFocus: HTMLElement | null = null;
export function saveFocus(): void { previousFocus = document.activeElement as HTMLElement; }
export function restoreFocus(): void { previousFocus?.focus(); previousFocus = null; }
export function focusFirst(container: HTMLElement): void {
  const el = container.querySelector<HTMLElement>('button, input, textarea, select, [tabindex]');
  el?.focus();
}
export function blurAll(): void { (document.activeElement as HTMLElement)?.blur(); }
