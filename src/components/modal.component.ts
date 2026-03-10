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
