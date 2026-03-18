export function disableContextMenu(el: HTMLElement): void {
  el.addEventListener('contextmenu', (e) => e.preventDefault());
}
export function createContextMenu(items: { label: string; action: () => void; icon?: string }[]): HTMLElement {
  const menu = document.createElement('div');
  menu.className = 'context-menu';
  menu.style.cssText = 'position:fixed;background:var(--surface,#1e1e3a);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:4px 0;z-index:1000;min-width:160px;box-shadow:0 8px 32px rgba(0,0,0,0.3)';
  items.forEach(item => {
    const btn = document.createElement('button');
    btn.style.cssText = 'display:flex;align-items:center;gap:8px;width:100%;padding:8px 16px;background:none;border:none;color:var(--text,#e8e8f0);cursor:pointer;font-size:0.85rem;text-align:left';
    btn.innerHTML = (item.icon || '') + ' ' + item.label;
    btn.addEventListener('click', () => { item.action(); menu.remove(); });
    menu.appendChild(btn);
  });
  document.addEventListener('click', () => menu.remove(), { once: true });
  return menu;
}
