export function isMobile(): boolean { return window.innerWidth < 768; }
export function isTablet(): boolean { return window.innerWidth >= 768 && window.innerWidth < 1024; }
export function isDesktop(): boolean { return window.innerWidth >= 1024; }
export type Breakpoint = 'mobile' | 'tablet' | 'desktop';
export function getBreakpoint(): Breakpoint {
  if (isMobile()) return 'mobile';
  if (isTablet()) return 'tablet';
  return 'desktop';
}
export function onBreakpointChange(callback: (bp: Breakpoint) => void): () => void {
  let current = getBreakpoint();
  const handler = () => { const next = getBreakpoint(); if (next !== current) { current = next; callback(current); } };
  window.addEventListener('resize', handler);
  return () => window.removeEventListener('resize', handler);
}
export function getViewportSize(): { width: number; height: number } {
  return { width: window.innerWidth, height: window.innerHeight };
}
