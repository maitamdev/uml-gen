export function initScrollProgress(): void {
  const bar = document.createElement('div');
  bar.id = 'scrollProgress';
  bar.style.cssText = 'position:fixed;top:0;left:0;height:3px;background:linear-gradient(90deg,#818cf8,#c084fc);z-index:9999;transition:width 0.1s;width:0';
  document.body.prepend(bar);
  window.addEventListener('scroll', () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    bar.style.width = pct + '%';
  });
}
