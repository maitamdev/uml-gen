$ErrorActionPreference = "Stop"
Set-Location "c:\Users\Asus\.gemini\antigravity\scratch\uml-generator"

# ---- Commit 11: diagram.constants.ts ----
New-Item -ItemType Directory -Force -Path "src/constants" | Out-Null
@"
// Diagram type constants and metadata
export const DIAGRAM_TYPES = ['usecase', 'activity', 'sequence', 'class'] as const;

export const DIAGRAM_LABELS: Record<string, string> = {
  usecase: 'Use Case Diagram',
  activity: 'Activity Diagram',
  sequence: 'Sequence Diagram',
  class: 'Class Diagram',
};

export const DIAGRAM_ICONS: Record<string, string> = {
  usecase: '👥',
  activity: '🔄',
  sequence: '📨',
  class: '🏗️',
};

export const DIAGRAM_DESCRIPTIONS: Record<string, string> = {
  usecase: 'Sơ đồ tác nhân & chức năng hệ thống',
  activity: 'Luồng hoạt động & quy trình xử lý',
  sequence: 'Tương tác giữa các đối tượng',
  class: 'Cấu trúc lớp & quan hệ kế thừa',
};

export const DIAGRAM_ACCENT_HUES: Record<string, number> = {
  usecase: 240,
  activity: 270,
  sequence: 200,
  class: 330,
};
"@ | Set-Content -Path "src/constants/diagram.constants.ts" -Encoding UTF8
git add -A; git commit -m "feat(constants): add diagram type enums and metadata"

# ---- Commit 12: provider.constants.ts ----
@"
// Provider configuration constants
export const DEFAULT_PROVIDER = 'huggingface' as const;
export const PROVIDER_STORAGE_KEY = 'uml-gen-provider';
export const API_KEY_PREFIX = 'uml-gen-key-';

export const PROVIDER_NAMES: Record<string, string> = {
  huggingface: 'Hugging Face',
  groq: 'Groq',
};

export const PROVIDER_MODELS: Record<string, string> = {
  huggingface: 'Qwen/Qwen2.5-Coder-32B-Instruct',
  groq: 'llama-3.3-70b-versatile',
};

export const API_TIMEOUT_MS = 30000;
export const MAX_RETRIES = 2;
export const RETRY_DELAY_MS = 1000;
"@ | Set-Content -Path "src/constants/provider.constants.ts" -Encoding UTF8
git add -A; git commit -m "feat(constants): add provider configuration constants"

# ---- Commit 13: ui.constants.ts ----
@"
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
"@ | Set-Content -Path "src/constants/ui.constants.ts" -Encoding UTF8
git add -A; git commit -m "feat(constants): add UI color palette and layout constants"

# ---- Commit 14: zoom.constants.ts ----
@"
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
"@ | Set-Content -Path "src/constants/zoom.constants.ts" -Encoding UTF8
git add -A; git commit -m "feat(constants): add zoom control limits and presets"

# ---- Commit 15: toast.constants.ts ----
@"
// Toast notification constants
export const TOAST_DURATION_MS = 4000;
export const TOAST_FADE_DURATION_MS = 300;
export const TOAST_MAX_VISIBLE = 5;
export const TOAST_GAP_PX = 8;

export const TOAST_ICONS: Record<string, string> = {
  success: '✅',
  error: '❌',
  info: 'ℹ️',
  warning: '⚠️',
};

export const TOAST_COLORS: Record<string, string> = {
  success: '#10b981',
  error: '#ef4444',
  info: '#6366f1',
  warning: '#f59e0b',
};
"@ | Set-Content -Path "src/constants/toast.constants.ts" -Encoding UTF8
git add -A; git commit -m "feat(constants): add toast notification configuration"

# ---- Commit 16: keyboard.constants.ts ----
@"
// Keyboard shortcut constants
export const SHORTCUTS = {
  GENERATE: { key: 'Enter', ctrlKey: true, description: 'Generate diagrams' },
  COPY_CODE: { key: 'c', ctrlKey: true, shiftKey: true, description: 'Copy Mermaid code' },
  EXPORT_PNG: { key: 'p', ctrlKey: true, shiftKey: true, description: 'Export as PNG' },
  EXPORT_SVG: { key: 's', ctrlKey: true, shiftKey: true, description: 'Export as SVG' },
  TOGGLE_CODE: { key: '`', ctrlKey: true, description: 'Toggle code panel' },
  FULLSCREEN: { key: 'f', ctrlKey: true, description: 'Toggle fullscreen' },
  ZOOM_IN: { key: '=', ctrlKey: true, description: 'Zoom in' },
  ZOOM_OUT: { key: '-', ctrlKey: true, description: 'Zoom out' },
  ZOOM_RESET: { key: '0', ctrlKey: true, description: 'Reset zoom' },
  ESCAPE: { key: 'Escape', description: 'Close modal/panel' },
} as const;

export type ShortcutKey = keyof typeof SHORTCUTS;
"@ | Set-Content -Path "src/constants/keyboard.constants.ts" -Encoding UTF8
git add -A; git commit -m "feat(constants): add keyboard shortcut definitions"

# ---- Commit 17: export.constants.ts ----
@"
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
"@ | Set-Content -Path "src/constants/export.constants.ts" -Encoding UTF8
git add -A; git commit -m "feat(constants): add export format configuration"

# ---- Commit 18: animation.constants.ts ----
@"
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
"@ | Set-Content -Path "src/constants/animation.constants.ts" -Encoding UTF8
git add -A; git commit -m "feat(constants): add animation timing and easing values"

# ---- Commit 19: api.constants.ts ----
@"
// API endpoint and configuration constants
export const HF_API_URL = 'https://router.huggingface.co/novita/v3/openai/chat/completions';
export const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export const HF_MODELS_URL = 'https://router.huggingface.co/novita/v3/openai/models';
export const GROQ_MODELS_URL = 'https://api.groq.com/openai/v1/models';

export const HTTP_STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  TOO_MANY_REQUESTS: 429,
  SERVER_ERROR: 500,
} as const;

export const AI_TEMPERATURE = 0.3;
export const AI_MAX_TOKENS = 2048;
"@ | Set-Content -Path "src/constants/api.constants.ts" -Encoding UTF8
git add -A; git commit -m "feat(constants): add API endpoint URLs and HTTP status codes"

# ---- Commit 20: constants/index.ts ----
@"
// Barrel exports for all constants
export * from './diagram.constants';
export * from './provider.constants';
export * from './ui.constants';
export * from './zoom.constants';
export * from './toast.constants';
export * from './keyboard.constants';
export * from './export.constants';
export * from './animation.constants';
export * from './api.constants';
"@ | Set-Content -Path "src/constants/index.ts" -Encoding UTF8
git add -A; git commit -m "feat(constants): add barrel exports for all constant modules"

Write-Host "Batch 2 done: 10 commits (Constants)" -ForegroundColor Green
