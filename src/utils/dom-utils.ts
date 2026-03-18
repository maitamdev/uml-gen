export function $(selector: string): HTMLElement | null { return document.querySelector(selector); }
export function $$(selector: string): NodeListOf<HTMLElement> { return document.querySelectorAll(selector); }
export function createElement<K extends keyof HTMLElementTagNameMap>(tag: K, attrs?: Record<string, string>): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  if (attrs) Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  return el;
}
export function show(el: HTMLElement): void { el.style.display = ''; }
export function hide(el: HTMLElement): void { el.style.display = 'none'; }
export function isVisible(el: HTMLElement): boolean { return el.offsetParent !== null; }
export function scrollToElement(el: HTMLElement, behavior: ScrollBehavior = 'smooth'): void {
  el.scrollIntoView({ behavior, block: 'start' });
}
