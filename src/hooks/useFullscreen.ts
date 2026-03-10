// Fullscreen Hook
export function useFullscreen(elementId: string) {
  let isFullscreen = false;

  function toggle(): void {
    const el = document.getElementById(elementId);
    if (!el) return;
    if (isFullscreen) exit(); else enter(el);
  }

  function enter(el: HTMLElement): void {
    el.classList.add('fullscreen-active');
    isFullscreen = true;
    document.addEventListener('keydown', handleEsc);
  }

  function exit(): void {
    const el = document.getElementById(elementId);
    el?.classList.remove('fullscreen-active');
    isFullscreen = false;
    document.removeEventListener('keydown', handleEsc);
  }

  function handleEsc(e: KeyboardEvent): void {
    if (e.key === 'Escape') exit();
  }

  function getState(): boolean {
    return isFullscreen;
  }

  return { toggle, enter, exit, getState };
}
