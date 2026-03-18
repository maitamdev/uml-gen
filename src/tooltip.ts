export function createTooltip(target: HTMLElement, text: string, position: 'top' | 'bottom' = 'top'): void {
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip tooltip-' + position;
  tooltip.textContent = text;
  tooltip.style.cssText = 'position:absolute;background:rgba(0,0,0,0.8);color:#fff;padding:4px 8px;border-radius:4px;font-size:0.72rem;pointer-events:none;z-index:999;white-space:nowrap;opacity:0;transition:opacity 0.2s';
  target.style.position = 'relative';
  target.appendChild(tooltip);
  target.addEventListener('mouseenter', () => { tooltip.style.opacity = '1'; });
  target.addEventListener('mouseleave', () => { tooltip.style.opacity = '0'; });
}
export function removeTooltip(target: HTMLElement): void {
  const tooltip = target.querySelector('.tooltip');
  if (tooltip) tooltip.remove();
}
