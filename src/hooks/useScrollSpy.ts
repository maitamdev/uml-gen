// Scroll Spy Hook - observe elements entering viewport
export function useScrollSpy(selector: string, onVisible: (el: HTMLElement) => void) {
  let observer: IntersectionObserver | null = null;

  function start(): void {
    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          onVisible(entry.target as HTMLElement);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll<HTMLElement>(selector).forEach(el => {
      observer?.observe(el);
    });
  }

  function stop(): void {
    observer?.disconnect();
    observer = null;
  }

  function refresh(): void {
    stop();
    start();
  }

  return { start, stop, refresh };
}
