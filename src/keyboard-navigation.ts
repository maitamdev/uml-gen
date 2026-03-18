export function setupArrowNavigation(container: HTMLElement, selector: string): void {
  const items = () => Array.from(container.querySelectorAll<HTMLElement>(selector));
  container.addEventListener('keydown', (e) => {
    const els = items();
    const idx = els.indexOf(document.activeElement as HTMLElement);
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      const next = idx < els.length - 1 ? idx + 1 : 0;
      els[next]?.focus();
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const prev = idx > 0 ? idx - 1 : els.length - 1;
      els[prev]?.focus();
    }
  });
}
