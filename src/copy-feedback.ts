export function showCopyFeedback(button: HTMLElement): void {
  const original = button.innerHTML;
  button.innerHTML = 'âœ… Copied!';
  button.classList.add('copy-success');
  setTimeout(() => {
    button.innerHTML = original;
    button.classList.remove('copy-success');
  }, 1500);
}
export function flashElement(el: HTMLElement, color: string = 'rgba(99,102,241,0.3)'): void {
  const original = el.style.backgroundColor;
  el.style.backgroundColor = color;
  el.style.transition = 'background-color 0.3s ease';
  setTimeout(() => { el.style.backgroundColor = original; }, 300);
}
