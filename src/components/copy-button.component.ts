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
