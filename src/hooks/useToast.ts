// Toast Dispatcher Hook
type ToastType = 'success' | 'error' | 'info' | 'warning';

export function useToast() {
  function show(message: string, type: ToastType = 'info', duration = 4000): void {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast toast-' + type;
    toast.textContent = message;
    container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('toast-visible'));
    setTimeout(() => {
      toast.classList.remove('toast-visible');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  function success(msg: string): void { show(msg, 'success'); }
  function error(msg: string): void { show(msg, 'error'); }
  function info(msg: string): void { show(msg, 'info'); }
  function warning(msg: string): void { show(msg, 'warning'); }

  return { show, success, error, info, warning };
}
