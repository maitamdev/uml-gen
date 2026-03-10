// Focus Trap - keeps focus within a container
export function createFocusTrap(container: HTMLElement) {
  const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

  function getFocusableElements(): HTMLElement[] {
    return Array.from(container.querySelectorAll<HTMLElement>(focusableSelector))
      .filter(el => !el.hasAttribute('disabled'));
  }

  function handleKeyDown(e: KeyboardEvent): void {
    if (e.key !== 'Tab') return;
    const focusable = getFocusableElements();
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function activate(): void {
    container.addEventListener('keydown', handleKeyDown);
    const focusable = getFocusableElements();
    if (focusable.length > 0) focusable[0].focus();
  }

  function deactivate(): void {
    container.removeEventListener('keydown', handleKeyDown);
  }

  return { activate, deactivate };
}
