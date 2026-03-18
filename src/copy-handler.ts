export function setupCopyHandlers(): void {
  document.addEventListener('copy', () => {
    const sel = window.getSelection()?.toString();
    if (sel && sel.length > 0) {
      console.debug('[Copy] User copied:', sel.length, 'chars');
    }
  });
}
