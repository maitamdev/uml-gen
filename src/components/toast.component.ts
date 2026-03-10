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
