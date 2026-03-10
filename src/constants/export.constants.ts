// Export configuration constants
export const EXPORT_SCALE = 2;
export const EXPORT_BG_COLOR = '#0a0a1a';
export const EXPORT_MAX_DIMENSION = 4096;

export const EXPORT_FORMATS = ['svg', 'png'] as const;

export const EXPORT_MIME_TYPES: Record<string, string> = {
  svg: 'image/svg+xml',
  png: 'image/png',
  pdf: 'application/pdf',
};

export const DEFAULT_FILENAME_PREFIX = 'uml-diagram';

export const EXPORT_QUALITY = {
  low: 1,
  medium: 2,
  high: 3,
  ultra: 4,
} as const;
