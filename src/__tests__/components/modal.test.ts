// Modal component tests
import { describe, it, expect, beforeEach } from 'vitest';
import { createModal, closeModal } from '../../components/modal.component';

describe('Modal Component', () => {
  beforeEach(() => { document.body.innerHTML = ''; });

  it('creates modal with title and content', () => {
    const modal = createModal({ title: 'Test', content: 'Body content' });
    expect(modal.querySelector('.modal-title')?.textContent).toBe('Test');
    expect(modal.querySelector('.modal-body')?.textContent).toBe('Body content');
  });

  it('has close button', () => {
    const modal = createModal({ title: 'Test', content: 'Body' });
    expect(modal.querySelector('.modal-close')).not.toBeNull();
  });

  it('has confirm and cancel buttons', () => {
    const modal = createModal({ title: 'Test', content: 'Body', confirmText: 'OK', cancelText: 'Cancel' });
    expect(modal.querySelector('.modal-confirm')?.textContent).toBe('OK');
    expect(modal.querySelector('.modal-cancel')?.textContent).toBe('Cancel');
  });

  it('closes modal on call', () => {
    const modal = createModal({ title: 'Test', content: 'Body' });
    document.body.appendChild(modal);
    closeModal(modal);
    // Modal has transition, so still present but will be removed after timeout
    expect(modal.classList.contains('modal-visible')).toBe(false);
  });
});
