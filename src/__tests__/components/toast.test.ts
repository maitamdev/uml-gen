// Toast component tests
import { describe, it, expect, beforeEach } from 'vitest';
import { showToast, clearAllToasts } from '../../components/toast.component';

describe('Toast Component', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="toastContainer"></div>';
  });

  it('creates toast element', () => {
    showToast({ message: 'Test toast', type: 'info' });
    const toasts = document.querySelectorAll('.toast');
    expect(toasts.length).toBe(1);
  });

  it('applies correct type class', () => {
    showToast({ message: 'Error', type: 'error' });
    const toast = document.querySelector('.toast');
    expect(toast?.classList.contains('toast-error')).toBe(true);
  });

  it('clears all toasts', () => {
    showToast({ message: 'A', type: 'info' });
    showToast({ message: 'B', type: 'success' });
    clearAllToasts();
    expect(document.querySelectorAll('.toast').length).toBe(0);
  });
});
