export function showModal(title: string, content: string, onConfirm?: () => void): HTMLElement {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;z-index:1000;backdrop-filter:blur(4px)';
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.style.cssText = 'background:var(--surface,#1a1a2e);border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:1.5rem;max-width:480px;width:90%;color:var(--text,#e8e8f0)';
  modal.innerHTML = '<h3 style="margin-bottom:0.75rem">' + title + '</h3><div style="margin-bottom:1rem;font-size:0.9rem;opacity:0.8">' + content + '</div><div style="display:flex;gap:0.5rem;justify-content:flex-end"><button class="btn btn-ghost modal-cancel">Há»§y</button>' + (onConfirm ? '<button class="btn btn-primary modal-confirm">XÃ¡c nháº­n</button>' : '') + '</div>';
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
  overlay.querySelector('.modal-cancel')?.addEventListener('click', () => overlay.remove());
  if (onConfirm) overlay.querySelector('.modal-confirm')?.addEventListener('click', () => { onConfirm(); overlay.remove(); });
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
  return overlay;
}
export function closeAllModals(): void { document.querySelectorAll('.modal-overlay').forEach(el => el.remove()); }
