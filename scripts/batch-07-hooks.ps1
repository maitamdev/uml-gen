$ErrorActionPreference = "Stop"
Set-Location "c:\Users\Asus\.gemini\antigravity\scratch\uml-generator"
New-Item -ItemType Directory -Force -Path "src/hooks" | Out-Null

# ---- Commit 61 ----
$c = @'
// LocalStorage Hook - reactive storage wrapper
export function useLocalStorage<T>(key: string, defaultValue: T) {
  const storageKey = 'uml-gen-' + key;

  function get(): T {
    try {
      const item = localStorage.getItem(storageKey);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  function set(value: T): void {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }

  function remove(): void {
    localStorage.removeItem(storageKey);
  }

  return { get, set, remove };
}
'@
Set-Content -Path "src/hooks/useLocalStorage.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "feat(hooks): add useLocalStorage reactive storage wrapper"

# ---- Commit 62 ----
$c = @'
// Theme Management Hook
export type ThemeMode = 'dark' | 'light' | 'auto';

export function useTheme() {
  const STORAGE_KEY = 'uml-gen-theme';

  function getTheme(): ThemeMode {
    return (localStorage.getItem(STORAGE_KEY) as ThemeMode) || 'dark';
  }

  function setTheme(mode: ThemeMode): void {
    localStorage.setItem(STORAGE_KEY, mode);
    document.documentElement.setAttribute('data-theme', mode);
  }

  function toggleTheme(): ThemeMode {
    const current = getTheme();
    const next: ThemeMode = current === 'dark' ? 'light' : 'dark';
    setTheme(next);
    return next;
  }

  function initTheme(): void {
    setTheme(getTheme());
  }

  return { getTheme, setTheme, toggleTheme, initTheme };
}
'@
Set-Content -Path "src/hooks/useTheme.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "feat(hooks): add useTheme for dark/light mode management"

# ---- Commit 63 ----
$c = @'
// Keyboard Shortcut Manager Hook
interface ShortcutHandler {
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  handler: (e: KeyboardEvent) => void;
  description: string;
}

export function useKeyboard() {
  const shortcuts: ShortcutHandler[] = [];

  function register(shortcut: ShortcutHandler): void {
    shortcuts.push(shortcut);
  }

  function start(): void {
    document.addEventListener('keydown', handleKeyDown);
  }

  function stop(): void {
    document.removeEventListener('keydown', handleKeyDown);
  }

  function handleKeyDown(e: KeyboardEvent): void {
    for (const s of shortcuts) {
      if (e.key === s.key &&
          !!e.ctrlKey === !!s.ctrlKey &&
          !!e.shiftKey === !!s.shiftKey &&
          !!e.altKey === !!s.altKey) {
        e.preventDefault();
        s.handler(e);
        break;
      }
    }
  }

  function getRegistered(): ShortcutHandler[] {
    return [...shortcuts];
  }

  return { register, start, stop, getRegistered };
}
'@
Set-Content -Path "src/hooks/useKeyboard.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "feat(hooks): add useKeyboard shortcut manager"

# ---- Commit 64 ----
$c = @'
// Clipboard Hook
export function useClipboard() {
  async function copy(text: string): Promise<boolean> {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return fallbackCopy(text);
    }
  }

  function fallbackCopy(text: string): boolean {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(textarea);
    return ok;
  }

  async function read(): Promise<string | null> {
    try { return await navigator.clipboard.readText(); }
    catch { return null; }
  }

  return { copy, read };
}
'@
Set-Content -Path "src/hooks/useClipboard.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "feat(hooks): add useClipboard with fallback support"

# ---- Commit 65 ----
$c = @'
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
'@
Set-Content -Path "src/hooks/useFullscreen.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "feat(hooks): add useFullscreen toggle with ESC handler"

# ---- Commit 66 ----
$c = @'
// Debounce Hook
export function useDebounce<T extends (...args: unknown[]) => void>(fn: T, delay: number) {
  let timer: ReturnType<typeof setTimeout> | null = null;

  function run(...args: Parameters<T>): void {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  }

  function cancel(): void {
    if (timer) { clearTimeout(timer); timer = null; }
  }

  function flush(...args: Parameters<T>): void {
    cancel();
    fn(...args);
  }

  return { run, cancel, flush };
}
'@
Set-Content -Path "src/hooks/useDebounce.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "feat(hooks): add useDebounce with cancel and flush"

# ---- Commit 67 ----
$c = @'
// Media Query Hook
export function useMediaQuery(query: string) {
  const mql = window.matchMedia(query);
  let callback: ((matches: boolean) => void) | null = null;

  function matches(): boolean {
    return mql.matches;
  }

  function onChange(cb: (matches: boolean) => void): void {
    callback = cb;
    mql.addEventListener('change', handleChange);
  }

  function handleChange(e: MediaQueryListEvent): void {
    callback?.(e.matches);
  }

  function destroy(): void {
    mql.removeEventListener('change', handleChange);
    callback = null;
  }

  return { matches, onChange, destroy };
}

export function useIsMobile() {
  return useMediaQuery('(max-width: 768px)');
}
'@
Set-Content -Path "src/hooks/useMediaQuery.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "feat(hooks): add useMediaQuery responsive detection hook"

# ---- Commit 68 ----
$c = @'
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
'@
Set-Content -Path "src/hooks/useScrollSpy.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "feat(hooks): add useScrollSpy intersection observer hook"

# ---- Commit 69 ----
$c = @'
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
'@
Set-Content -Path "src/hooks/useAnimation.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "feat(hooks): add useAnimation with fade, scale, stagger effects"

# ---- Commit 70 ----
$c = @'
// Toast Dispatcher Hook
type ToastType = 'success' | 'error' | 'info' | 'warning';

export function useToast() {
  function show(message: string, type: ToastType = 'info', duration = 4000): void {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast toast-' + type;
    toast.textContent = message;
    container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('toast-visible'));
    setTimeout(() => {
      toast.classList.remove('toast-visible');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  function success(msg: string): void { show(msg, 'success'); }
  function error(msg: string): void { show(msg, 'error'); }
  function info(msg: string): void { show(msg, 'info'); }
  function warning(msg: string): void { show(msg, 'warning'); }

  return { show, success, error, info, warning };
}
'@
Set-Content -Path "src/hooks/useToast.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "feat(hooks): add useToast dispatcher with convenience methods"

Write-Host "Batch 7 done: 10 commits (Hooks)" -ForegroundColor Green
