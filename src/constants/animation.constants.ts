// Animation timing constants
export const ANIMATION_DURATION = {
  fast: 150,
  normal: 250,
  slow: 400,
  verySlow: 600,
} as const;

export const EASING = {
  default: 'cubic-bezier(0.4, 0, 0.2, 1)',
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

export const STAGGER_DELAY_MS = 50;
export const INTERSECTION_THRESHOLD = 0.1;
