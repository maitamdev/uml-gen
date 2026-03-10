// Tooltip Component
export interface TooltipOptions {
  text: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

export function addTooltip(element: HTMLElement, options: TooltipOptions): void {
  let tooltip: HTMLElement | null = null;
  let timer: ReturnType<typeof setTimeout> | null = null;

  element.addEventListener('mouseenter', () => {
    timer = setTimeout(() => {
      tooltip = document.createElement('div');
      tooltip.className = `tooltip tooltip-${options.position || 'top'}`;
      tooltip.textContent = options.text;
      document.body.appendChild(tooltip);
      const rect = element.getBoundingClientRect();
      const tipRect = tooltip.getBoundingClientRect();
      tooltip.style.left = rect.left + rect.width / 2 - tipRect.width / 2 + 'px';
      tooltip.style.top = rect.top - tipRect.height - 8 + 'px';
      tooltip.classList.add('tooltip-visible');
    }, options.delay || 500);
  });

  element.addEventListener('mouseleave', () => {
    if (timer) clearTimeout(timer);
    if (tooltip) { tooltip.remove(); tooltip = null; }
  });
}

export function removeAllTooltips(): void {
  document.querySelectorAll('.tooltip').forEach(t => t.remove());
}
