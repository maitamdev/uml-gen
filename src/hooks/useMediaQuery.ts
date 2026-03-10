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
