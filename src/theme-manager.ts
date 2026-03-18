export type ThemeMode = 'dark' | 'light' | 'auto';
const THEME_KEY = 'uml-gen-theme';
export function getTheme(): ThemeMode {
  return (localStorage.getItem(THEME_KEY) as ThemeMode) || 'dark';
}
export function setTheme(mode: ThemeMode): void {
  localStorage.setItem(THEME_KEY, mode);
  applyTheme(mode);
}
export function applyTheme(mode: ThemeMode): void {
  const resolved = mode === 'auto'
    ? (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
    : mode;
  document.documentElement.setAttribute('data-theme', resolved);
  document.body.classList.toggle('light-theme', resolved === 'light');
}
export function initTheme(): void {
  applyTheme(getTheme());
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (getTheme() === 'auto') applyTheme('auto');
  });
}
