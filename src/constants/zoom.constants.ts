// Zoom control constants
export const ZOOM_MIN = 25;
export const ZOOM_MAX = 200;
export const ZOOM_STEP = 5;
export const ZOOM_DEFAULT = 100;
export const ZOOM_FIT_PADDING = 20;

export const ZOOM_PRESETS = {
  fit: 'fit',
  '50%': 50,
  '75%': 75,
  '100%': 100,
  '125%': 125,
  '150%': 150,
  '200%': 200,
} as const;

export const PINCH_SENSITIVITY = 0.01;
export const WHEEL_SENSITIVITY = 0.1;
