// UI constants - colors, sizes, breakpoints
export const COLORS = {
  indigo: '#6366f1',
  violet: '#8b5cf6',
  purple: '#a78bfa',
  pink: '#ec4899',
  cyan: '#22d3ee',
  emerald: '#10b981',
  amber: '#f59e0b',
  rose: '#f43f5e',
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export const Z_INDEX = {
  base: 0,
  dropdown: 50,
  sticky: 100,
  header: 200,
  modal: 300,
  toast: 400,
  tooltip: 500,
} as const;
