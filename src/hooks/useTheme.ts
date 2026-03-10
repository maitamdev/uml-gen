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
