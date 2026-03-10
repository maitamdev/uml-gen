$ErrorActionPreference = "Stop"
Set-Location "c:\Users\Asus\.gemini\antigravity\scratch\uml-generator"
New-Item -ItemType Directory -Force -Path "src/components" | Out-Null

# ---- Commit 51 ----
$c = @'
// Toast Manager Component
import type { ToastType } from '../types/toast.types';

export interface ToastOptions {
  message: string;
  type: ToastType;
  duration?: number;
}

let toastContainer: HTMLElement | null = null;

function getContainer(): HTMLElement {
  if (!toastContainer) {
    toastContainer = document.getElementById('toastContainer');
  }
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    toastContainer.id = 'toastContainer';
    document.body.appendChild(toastContainer);
  }
  return toastContainer;
}

export function showToast(options: ToastOptions): void {
  const container = getContainer();
  const toast = document.createElement('div');
  toast.className = `toast toast-${options.type}`;
  toast.innerHTML = `<span class="toast-msg">${options.message}</span>`;
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('toast-visible'));
  setTimeout(() => {
    toast.classList.remove('toast-visible');
    setTimeout(() => toast.remove(), 300);
  }, options.duration || 4000);
}

export function clearAllToasts(): void {
  const container = getContainer();
  container.innerHTML = '';
}
'@
Set-Content -Path "src/components/toast.component.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "feat(components): add toast notification manager component"

# ---- Commit 52 ----
$c = @'
// Modal Dialog Component
export interface ModalOptions {
  title: string;
  content: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export function createModal(options: ModalOptions): HTMLElement {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal-dialog">
      <div class="modal-header">
        <h3 class="modal-title">${options.title}</h3>
        <button class="modal-close" aria-label="Close">&times;</button>
      </div>
      <div class="modal-body">${options.content}</div>
      <div class="modal-footer">
        <button class="btn btn-ghost modal-cancel">${options.cancelText || 'Huy'}</button>
        <button class="btn btn-primary modal-confirm">${options.confirmText || 'Xac nhan'}</button>
      </div>
    </div>
  `;
  overlay.querySelector('.modal-close')?.addEventListener('click', () => closeModal(overlay));
  overlay.querySelector('.modal-cancel')?.addEventListener('click', () => { options.onCancel?.(); closeModal(overlay); });
  overlay.querySelector('.modal-confirm')?.addEventListener('click', () => { options.onConfirm?.(); closeModal(overlay); });
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(overlay); });
  return overlay;
}

export function openModal(options: ModalOptions): void {
  const modal = createModal(options);
  document.body.appendChild(modal);
  requestAnimationFrame(() => modal.classList.add('modal-visible'));
}

export function closeModal(overlay: HTMLElement): void {
  overlay.classList.remove('modal-visible');
  setTimeout(() => overlay.remove(), 300);
}
'@
Set-Content -Path "src/components/modal.component.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "feat(components): add modal dialog component with overlay"

# ---- Commit 53 ----
$c = @'
// Tab Controller Component
export interface TabConfig {
  type: string;
  label: string;
  icon: string;
}

export class TabController {
  private tabs: TabConfig[];
  private activeTab: string;
  private onChange: (type: string) => void;

  constructor(tabs: TabConfig[], defaultTab: string, onChange: (type: string) => void) {
    this.tabs = tabs;
    this.activeTab = defaultTab;
    this.onChange = onChange;
  }

  getActiveTab(): string {
    return this.activeTab;
  }

  setActiveTab(type: string): void {
    if (this.tabs.some(t => t.type === type)) {
      this.activeTab = type;
      this.onChange(type);
    }
  }

  nextTab(): void {
    const idx = this.tabs.findIndex(t => t.type === this.activeTab);
    const next = (idx + 1) % this.tabs.length;
    this.setActiveTab(this.tabs[next].type);
  }

  prevTab(): void {
    const idx = this.tabs.findIndex(t => t.type === this.activeTab);
    const prev = (idx - 1 + this.tabs.length) % this.tabs.length;
    this.setActiveTab(this.tabs[prev].type);
  }

  getTabs(): TabConfig[] {
    return [...this.tabs];
  }
}
'@
Set-Content -Path "src/components/tabs.component.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "feat(components): add tab controller with navigation methods"

# ---- Commit 54 ----
$c = @'
// Dropdown Menu Component
export interface DropdownItem {
  value: string;
  label: string;
  icon?: string;
  description?: string;
}

export class DropdownController {
  private isOpen = false;
  private trigger: HTMLElement;
  private menu: HTMLElement;

  constructor(triggerId: string, menuId: string) {
    this.trigger = document.getElementById(triggerId)!;
    this.menu = document.getElementById(menuId)!;
    this.setupListeners();
  }

  private setupListeners(): void {
    this.trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggle();
    });
    document.addEventListener('click', () => this.close());
  }

  toggle(): void {
    this.isOpen = !this.isOpen;
    this.menu.classList.toggle('open', this.isOpen);
  }

  open(): void {
    this.isOpen = true;
    this.menu.classList.add('open');
  }

  close(): void {
    this.isOpen = false;
    this.menu.classList.remove('open');
  }

  getState(): boolean {
    return this.isOpen;
  }
}
'@
Set-Content -Path "src/components/dropdown.component.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "feat(components): add dropdown menu controller"

# ---- Commit 55 ----
$c = @'
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
'@
Set-Content -Path "src/components/tooltip.component.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "feat(components): add tooltip system with positioning"

# ---- Commit 56 ----
$c = @'
// Progress Bar Component
export class ProgressBar {
  private element: HTMLElement;
  private fill: HTMLElement;
  private label: HTMLElement;
  private value: number = 0;

  constructor(container: HTMLElement) {
    this.element = document.createElement('div');
    this.element.className = 'progress-bar';
    this.fill = document.createElement('div');
    this.fill.className = 'progress-bar-fill';
    this.label = document.createElement('span');
    this.label.className = 'progress-bar-label';
    this.element.appendChild(this.fill);
    this.element.appendChild(this.label);
    container.appendChild(this.element);
  }

  setValue(percent: number): void {
    this.value = Math.min(100, Math.max(0, percent));
    this.fill.style.width = this.value + '%';
    this.label.textContent = Math.round(this.value) + '%';
  }

  getValue(): number {
    return this.value;
  }

  setIndeterminate(active: boolean): void {
    this.element.classList.toggle('progress-indeterminate', active);
  }

  destroy(): void {
    this.element.remove();
  }
}
'@
Set-Content -Path "src/components/progress-bar.component.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "feat(components): add progress bar with percentage display"

# ---- Commit 57 ----
$c = @'
// Skeleton Loader Component
export function createSkeleton(lines: number = 3, animate = true): HTMLElement {
  const wrapper = document.createElement('div');
  wrapper.className = 'skeleton-wrapper';
  for (let i = 0; i < lines; i++) {
    const line = document.createElement('div');
    line.className = 'skeleton-line';
    if (animate) line.classList.add('skeleton-animate');
    line.style.width = (70 + Math.random() * 30) + '%';
    if (i === 0) line.style.height = '1.5rem';
    wrapper.appendChild(line);
  }
  return wrapper;
}

export function createSkeletonCard(): HTMLElement {
  const card = document.createElement('div');
  card.className = 'skeleton-card';
  card.innerHTML = `
    <div class="skeleton-line skeleton-animate" style="width:40%;height:1.2rem"></div>
    <div class="skeleton-line skeleton-animate" style="width:100%"></div>
    <div class="skeleton-line skeleton-animate" style="width:80%"></div>
    <div class="skeleton-line skeleton-animate" style="width:60%"></div>
  `;
  return card;
}

export function removeSkeleton(container: HTMLElement): void {
  container.querySelectorAll('.skeleton-wrapper, .skeleton-card').forEach(s => s.remove());
}
'@
Set-Content -Path "src/components/skeleton.component.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "feat(components): add skeleton loader for loading states"

# ---- Commit 58 ----
$c = @'
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
'@
Set-Content -Path "src/components/badge.component.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "feat(components): add status badge and indicator components"

# ---- Commit 59 ----
$c = @'
// Copy Button Component
export function createCopyButton(getText: () => string, label = 'Copy'): HTMLElement {
  const btn = document.createElement('button');
  btn.className = 'btn btn-export btn-copy';
  btn.innerHTML = `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
    </svg>
    <span class="copy-label">${label}</span>
  `;
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(getText());
      const labelEl = btn.querySelector('.copy-label')!;
      labelEl.textContent = 'Copied!';
      btn.classList.add('copy-success');
      setTimeout(() => {
        labelEl.textContent = label;
        btn.classList.remove('copy-success');
      }, 2000);
    } catch { /* fallback handled elsewhere */ }
  });
  return btn;
}
'@
Set-Content -Path "src/components/copy-button.component.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "feat(components): add copy button with success feedback"

# ---- Commit 60 ----
$c = @'
// Zoom Controls Component
export class ZoomController {
  private level: number;
  private min: number;
  private max: number;
  private step: number;
  private onChange: (level: number) => void;

  constructor(config: { min: number; max: number; step: number; default: number }, onChange: (level: number) => void) {
    this.min = config.min;
    this.max = config.max;
    this.step = config.step;
    this.level = config.default;
    this.onChange = onChange;
  }

  zoomIn(): number {
    this.level = Math.min(this.max, this.level + this.step);
    this.onChange(this.level);
    return this.level;
  }

  zoomOut(): number {
    this.level = Math.max(this.min, this.level - this.step);
    this.onChange(this.level);
    return this.level;
  }

  reset(): number {
    this.level = 100;
    this.onChange(this.level);
    return this.level;
  }

  setLevel(level: number): number {
    this.level = Math.min(this.max, Math.max(this.min, level));
    this.onChange(this.level);
    return this.level;
  }

  getLevel(): number {
    return this.level;
  }

  getPercentage(): string {
    return this.level + '%';
  }
}
'@
Set-Content -Path "src/components/zoom-controls.component.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "feat(components): add zoom controls with level management"

Write-Host "Batch 6 done: 10 commits (Components)" -ForegroundColor Green
