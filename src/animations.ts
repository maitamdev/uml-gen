export function fadeIn(el: HTMLElement, duration: number = 300): void {
  el.style.opacity = '0'; el.style.display = '';
  el.style.transition = 'opacity ' + duration + 'ms ease';
  requestAnimationFrame(() => { el.style.opacity = '1'; });
}
export function fadeOut(el: HTMLElement, duration: number = 300): Promise<void> {
  return new Promise(resolve => {
    el.style.transition = 'opacity ' + duration + 'ms ease';
    el.style.opacity = '0';
    setTimeout(() => { el.style.display = 'none'; resolve(); }, duration);
  });
}
export function slideDown(el: HTMLElement, duration: number = 300): void {
  el.style.maxHeight = '0'; el.style.overflow = 'hidden'; el.style.display = '';
  el.style.transition = 'max-height ' + duration + 'ms ease';
  requestAnimationFrame(() => { el.style.maxHeight = el.scrollHeight + 'px'; });
}
export function slideUp(el: HTMLElement, duration: number = 300): Promise<void> {
  return new Promise(resolve => {
    el.style.maxHeight = el.scrollHeight + 'px'; el.style.overflow = 'hidden';
    el.style.transition = 'max-height ' + duration + 'ms ease';
    requestAnimationFrame(() => { el.style.maxHeight = '0'; });
    setTimeout(() => { el.style.display = 'none'; resolve(); }, duration);
  });
}
