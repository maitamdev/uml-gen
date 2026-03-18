export function showPreloader(): HTMLElement {
  const el = document.createElement('div');
  el.id = 'appPreloader';
  el.style.cssText = 'position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:#0a0a1a;z-index:10000;transition:opacity 0.3s';
  el.innerHTML = '<div style="text-align:center"><div style="font-size:3rem;margin-bottom:1rem">ðŸ“</div><div style="color:#818cf8;font-size:1.1rem;font-weight:600">UML Generator</div><div style="color:#6a6a8a;font-size:0.8rem;margin-top:0.5rem">Loading...</div></div>';
  document.body.prepend(el);
  return el;
}
export function hidePreloader(): void {
  const el = document.getElementById('appPreloader');
  if (el) { el.style.opacity = '0'; setTimeout(() => el.remove(), 300); }
}
