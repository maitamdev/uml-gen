// Status Badge Component
export type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral';

export function createBadge(text: string, variant: BadgeVariant = 'neutral'): HTMLElement {
  const badge = document.createElement('span');
  badge.className = `badge badge-${variant}`;
  badge.textContent = text;
  return badge;
}

export function createStatusDot(active: boolean): HTMLElement {
  const dot = document.createElement('span');
  dot.className = 'status-dot';
  dot.classList.toggle('status-dot-active', active);
  return dot;
}

export function createProviderBadge(provider: string, active: boolean): HTMLElement {
  const badge = document.createElement('div');
  badge.className = 'provider-badge';
  badge.innerHTML = `
    <span class="status-dot ${active ? 'status-dot-active' : ''}"></span>
    <span class="provider-name">${provider}</span>
  `;
  return badge;
}
