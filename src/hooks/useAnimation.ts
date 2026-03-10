// Animation Controller Hook
export function useAnimation() {
  function fadeIn(el: HTMLElement, duration = 300): Promise<void> {
    return animate(el, [{ opacity: '0', transform: 'translateY(8px)' }, { opacity: '1', transform: 'translateY(0)' }], duration);
  }

  function fadeOut(el: HTMLElement, duration = 200): Promise<void> {
    return animate(el, [{ opacity: '1' }, { opacity: '0' }], duration);
  }

  function scaleIn(el: HTMLElement, duration = 250): Promise<void> {
    return animate(el, [{ opacity: '0', transform: 'scale(0.95)' }, { opacity: '1', transform: 'scale(1)' }], duration);
  }

  function animate(el: HTMLElement, keyframes: Keyframe[], duration: number): Promise<void> {
    return new Promise(resolve => {
      const anim = el.animate(keyframes, { duration, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', fill: 'forwards' });
      anim.onfinish = () => resolve();
    });
  }

  function staggerIn(elements: HTMLElement[], delay = 50): void {
    elements.forEach((el, i) => {
      setTimeout(() => fadeIn(el), i * delay);
    });
  }

  return { fadeIn, fadeOut, scaleIn, animate, staggerIn };
}
