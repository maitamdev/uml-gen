// ============================================
// Toast Notification Manager
// ============================================

import { TOAST_DURATION } from './constants';

export interface ToastConfig {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  dismissible?: boolean;
}

const TOAST_ICONS: Record<string, string> = {
  success: 'âœ…',
  error: 'âŒ',
  info: 'â„¹ï¸',
  warning: 'âš ï¸',
};

let toastContainer: HTMLElement | null = null;

function getContainer(): HTMLElement {
  if (!toastContainer) {
    toastContainer = document.getElementById('toastContainer');
  }
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toastContainer';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }
  return toastContainer;
}

export function showToast(config: ToastConfig): void {
  const container = getContainer();
  const duration = config.duration || TOAST_DURATION.MEDIUM;

  const toast = document.createElement('div');
  toast.className = 	oast toast-;
  toast.innerHTML = 
    <span class="toast-icon"></span>
    <span class="toast-message"></span>
    
  ;

  if (config.dismissible) {
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn?.addEventListener('click', () => removeToast(toast));
  }

  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('toast-visible'));

  setTimeout(() => removeToast(toast), duration);
}

function removeToast(toast: HTMLElement): void {
  toast.classList.remove('toast-visible');
  toast.classList.add('toast-hiding');
  setTimeout(() => toast.remove(), 300);
}

export function clearAllToasts(): void {
  const container = getContainer();
  container.innerHTML = '';
}
