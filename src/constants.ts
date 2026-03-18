// ============================================
// Application Constants
// ============================================

export const APP_NAME = 'UML Generator';
export const APP_VERSION = '1.2.0';

export const DIAGRAM_TYPES = ['usecase', 'activity', 'sequence', 'class', 'erd', 'state'] as const;

export const DIAGRAM_LABELS: Record<string, string> = {
  usecase: 'Use Case Diagram',
  activity: 'Activity Diagram',
  sequence: 'Sequence Diagram',
  class: 'Class Diagram',
  erd: 'ERD Diagram',
  state: 'State Diagram',
};

export const DIAGRAM_ICONS: Record<string, string> = {
  usecase: 'ðŸ‘¥',
  activity: 'ðŸ”„',
  sequence: 'ðŸ“¨',
  class: 'ðŸ—ï¸',
  erd: 'ðŸ—ƒï¸',
  state: 'ðŸ”€',
};

export const ZOOM_CONFIG = {
  MIN: 0.25,
  MAX: 2.0,
  STEP: 0.1,
  DEFAULT: 1.0,
} as const;

export const TOAST_DURATION = {
  SHORT: 2000,
  MEDIUM: 3500,
  LONG: 5000,
} as const;

export const API_TIMEOUT = 30000;
export const STATUS_CHECK_TIMEOUT = 5000;
export const MAX_RETRIES = 3;
export const DEBOUNCE_DELAY = 300;

export const STORAGE_KEYS = {
  API_KEY: 'uml-gen-api-key',
  PROVIDER: 'uml-gen-provider',
  THEME: 'uml-gen-theme',
  ZOOM: 'uml-gen-zoom',
  LAST_INPUT: 'uml-gen-last-input',
  HISTORY: 'uml-gen-history',
} as const;

export const KEYBOARD_SHORTCUTS = {
  GENERATE: 'Ctrl+Enter',
  ZOOM_IN: 'Ctrl+=',
  ZOOM_OUT: 'Ctrl+-',
  RESET_ZOOM: 'Ctrl+0',
  FULLSCREEN: 'F11',
  COPY: 'Ctrl+C',
  EXPORT: 'Ctrl+S',
} as const;

export const MIN_INPUT_LENGTH = 15;
export const MIN_WORD_COUNT = 3;
