$ErrorActionPreference = "Stop"
Set-Location "c:\Users\Asus\.gemini\antigravity\scratch\uml-generator"

# =============================================
# PHASE 1: i18n Internationalization (10 commits + 1 merge)
# =============================================
git checkout -b feature/i18n-system

New-Item -ItemType Directory -Force -Path "src/i18n" | Out-Null

$c = @'
// i18n - Language type definitions
export type Locale = 'vi' | 'en' | 'ja' | 'ko' | 'zh';

export interface TranslationMap {
  [key: string]: string | TranslationMap;
}

export interface I18nConfig {
  defaultLocale: Locale;
  fallbackLocale: Locale;
  availableLocales: Locale[];
}
'@
Set-Content -Path "src/i18n/types.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "feat(i18n): add language type definitions and config interface"

$c = @'
// i18n - Vietnamese translations (default)
export const vi = {
  app: {
    title: 'UML Diagram Generator',
    subtitle: 'Tao so do UML tu dong bang AI',
  },
  actions: {
    generate: 'Generate Diagrams',
    copy: 'Copy',
    export_svg: 'Xuat SVG',
    export_png: 'Xuat PNG',
    save: 'Luu',
    cancel: 'Huy',
    close: 'Dong',
    retry: 'Thu lai',
  },
  status: {
    loading: 'Dang xu ly...',
    success: 'Thanh cong!',
    error: 'Da xay ra loi',
    ready: 'San sang',
    checking: 'Dang kiem tra...',
  },
  diagrams: {
    usecase: 'Use Case Diagram',
    activity: 'Activity Diagram',
    sequence: 'Sequence Diagram',
    class: 'Class Diagram',
  },
  errors: {
    no_input: 'Vui long nhap mo ta de tai',
    api_key_invalid: 'API Key khong hop le',
    rate_limit: 'Da vuot gioi han request',
    network: 'Loi ket noi mang',
  },
};
'@
Set-Content -Path "src/i18n/vi.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "feat(i18n): add Vietnamese translation strings"

$c = @'
// i18n - English translations
export const en = {
  app: {
    title: 'UML Diagram Generator',
    subtitle: 'Generate UML diagrams automatically with AI',
  },
  actions: {
    generate: 'Generate Diagrams',
    copy: 'Copy',
    export_svg: 'Export SVG',
    export_png: 'Export PNG',
    save: 'Save',
    cancel: 'Cancel',
    close: 'Close',
    retry: 'Retry',
  },
  status: {
    loading: 'Processing...',
    success: 'Success!',
    error: 'An error occurred',
    ready: 'Ready',
    checking: 'Checking...',
  },
  diagrams: {
    usecase: 'Use Case Diagram',
    activity: 'Activity Diagram',
    sequence: 'Sequence Diagram',
    class: 'Class Diagram',
  },
  errors: {
    no_input: 'Please enter a project description',
    api_key_invalid: 'Invalid API Key',
    rate_limit: 'Request rate limit exceeded',
    network: 'Network connection error',
  },
};
'@
Set-Content -Path "src/i18n/en.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "feat(i18n): add English translation strings"

$c = @'
// i18n - Japanese translations
export const ja = {
  app: {
    title: 'UMLダイアグラムジェネレーター',
    subtitle: 'AIで自動的にUMLダイアグラムを生成',
  },
  actions: {
    generate: 'ダイアグラム生成',
    copy: 'コピー',
    export_svg: 'SVGエクスポート',
    export_png: 'PNGエクスポート',
    save: '保存',
    cancel: 'キャンセル',
    close: '閉じる',
    retry: 'リトライ',
  },
  status: {
    loading: '処理中...',
    success: '成功！',
    error: 'エラーが発生しました',
    ready: '準備完了',
    checking: '確認中...',
  },
  diagrams: {
    usecase: 'ユースケース図',
    activity: 'アクティビティ図',
    sequence: 'シーケンス図',
    class: 'クラス図',
  },
};
'@
Set-Content -Path "src/i18n/ja.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "feat(i18n): add Japanese translation strings"

$c = @'
// i18n - Korean translations
export const ko = {
  app: {
    title: 'UML 다이어그램 생성기',
    subtitle: 'AI로 자동으로 UML 다이어그램 생성',
  },
  actions: {
    generate: '다이어그램 생성',
    copy: '복사',
    export_svg: 'SVG 내보내기',
    export_png: 'PNG 내보내기',
    save: '저장',
    cancel: '취소',
    close: '닫기',
    retry: '재시도',
  },
  status: {
    loading: '처리 중...',
    success: '성공!',
    error: '오류가 발생했습니다',
    ready: '준비 완료',
    checking: '확인 중...',
  },
  diagrams: {
    usecase: '유스케이스 다이어그램',
    activity: '활동 다이어그램',
    sequence: '시퀀스 다이어그램',
    class: '클래스 다이어그램',
  },
};
'@
Set-Content -Path "src/i18n/ko.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "feat(i18n): add Korean translation strings"

$c = @'
// i18n - Chinese Simplified translations
export const zh = {
  app: {
    title: 'UML图表生成器',
    subtitle: '使用AI自动生成UML图表',
  },
  actions: {
    generate: '生成图表',
    copy: '复制',
    export_svg: '导出SVG',
    export_png: '导出PNG',
    save: '保存',
    cancel: '取消',
    close: '关闭',
    retry: '重试',
  },
  status: {
    loading: '处理中...',
    success: '成功！',
    error: '发生错误',
    ready: '就绪',
    checking: '检查中...',
  },
  diagrams: {
    usecase: '用例图',
    activity: '活动图',
    sequence: '序列图',
    class: '类图',
  },
};
'@
Set-Content -Path "src/i18n/zh.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "feat(i18n): add Chinese Simplified translation strings"

$c = @'
// i18n - Translation engine
import type { Locale, TranslationMap } from './types';
import { vi } from './vi';
import { en } from './en';

const translations: Record<string, TranslationMap> = { vi, en };
let currentLocale: Locale = 'vi';

export function setLocale(locale: Locale): void {
  currentLocale = locale;
  document.documentElement.lang = locale;
  localStorage.setItem('uml-gen-locale', locale);
}

export function getLocale(): Locale {
  return currentLocale;
}

export function t(key: string): string {
  const keys = key.split('.');
  let result: unknown = translations[currentLocale] || translations['vi'];
  for (const k of keys) {
    if (result && typeof result === 'object' && k in (result as Record<string, unknown>)) {
      result = (result as Record<string, unknown>)[k];
    } else {
      return key;
    }
  }
  return typeof result === 'string' ? result : key;
}

export function initI18n(): void {
  const saved = localStorage.getItem('uml-gen-locale') as Locale | null;
  if (saved) setLocale(saved);
}
'@
Set-Content -Path "src/i18n/index.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "feat(i18n): add translation engine with locale switching"

# Merge feature/i18n-system -> main
git checkout main
git merge --no-ff feature/i18n-system -m "merge: integrate i18n internationalization system (#1)"
git branch -d feature/i18n-system

Write-Host "Phase 1 done: i18n (7 commits + 1 merge)" -ForegroundColor Green

# =============================================
# PHASE 2: Performance & Optimization (10 commits + 1 merge)
# =============================================
git checkout -b feature/performance

New-Item -ItemType Directory -Force -Path "src/performance" | Out-Null

$c = @'
// Performance monitoring utilities
export class PerfMonitor {
  private marks: Map<string, number> = new Map();

  mark(name: string): void {
    this.marks.set(name, performance.now());
  }

  measure(name: string, startMark: string): number {
    const start = this.marks.get(startMark);
    if (!start) return -1;
    const duration = performance.now() - start;
    console.debug('[perf]', name, duration.toFixed(2) + 'ms');
    return duration;
  }

  clear(): void {
    this.marks.clear();
  }
}

export const perfMonitor = new PerfMonitor();
'@
Set-Content -Path "src/performance/perf-monitor.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "perf: add performance monitoring utility class"

$c = @'
// Lazy loading utilities
export function lazyLoad<T>(factory: () => Promise<T>): () => Promise<T> {
  let cached: T | null = null;
  let loading: Promise<T> | null = null;

  return async () => {
    if (cached) return cached;
    if (loading) return loading;
    loading = factory().then(result => {
      cached = result;
      loading = null;
      return result;
    });
    return loading;
  };
}

export function preloadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
'@
Set-Content -Path "src/performance/lazy-load.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "perf: add lazy loading and image preload utilities"

$c = @'
// Resource preloader - preconnect and prefetch
export function addPreconnect(url: string): void {
  if (document.querySelector('link[href="' + url + '"]')) return;
  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = url;
  document.head.appendChild(link);
}

export function addPrefetch(url: string): void {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = url;
  document.head.appendChild(link);
}

export function preconnectAPIs(): void {
  addPreconnect('https://router.huggingface.co');
  addPreconnect('https://api.groq.com');
  addPreconnect('https://fonts.googleapis.com');
  addPreconnect('https://fonts.gstatic.com');
}
'@
Set-Content -Path "src/performance/preloader.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "perf: add resource preconnect and prefetch utilities"

$c = @'
// Memory management utilities
export function cleanupEventListeners(element: HTMLElement): void {
  const clone = element.cloneNode(true) as HTMLElement;
  element.parentNode?.replaceChild(clone, element);
}

export function revokeObjectURLs(urls: string[]): void {
  urls.forEach(url => URL.revokeObjectURL(url));
}

export function getMemoryUsage(): { used: number; total: number } | null {
  const perf = performance as unknown as { memory?: { usedJSHeapSize: number; totalJSHeapSize: number } };
  if (!perf.memory) return null;
  return {
    used: Math.round(perf.memory.usedJSHeapSize / 1048576),
    total: Math.round(perf.memory.totalJSHeapSize / 1048576),
  };
}
'@
Set-Content -Path "src/performance/memory.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "perf: add memory management and cleanup utilities"

$c = @'
// Barrel exports for performance module
export { PerfMonitor, perfMonitor } from './perf-monitor';
export { lazyLoad, preloadImage } from './lazy-load';
export { addPreconnect, addPrefetch, preconnectAPIs } from './preloader';
export { cleanupEventListeners, revokeObjectURLs, getMemoryUsage } from './memory';
'@
Set-Content -Path "src/performance/index.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "perf: add barrel exports for performance module"

git checkout main
git merge --no-ff feature/performance -m "merge: add performance monitoring and optimization utilities (#2)"
git branch -d feature/performance

Write-Host "Phase 2 done: Performance (5 commits + 1 merge)" -ForegroundColor Green

# =============================================
# PHASE 3: Security Hardening (8 commits + 1 merge)
# =============================================
git checkout -b feature/security

New-Item -ItemType Directory -Force -Path "src/security" | Out-Null

$c = @'
// Content Security Policy helpers
export function generateCSPMeta(): string {
  return [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "connect-src 'self' https://router.huggingface.co https://api.groq.com",
    "img-src 'self' data: blob:",
  ].join('; ');
}

export function injectCSPMeta(): void {
  const meta = document.createElement('meta');
  meta.httpEquiv = 'Content-Security-Policy';
  meta.content = generateCSPMeta();
  document.head.prepend(meta);
}
'@
Set-Content -Path "src/security/csp.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "security: add Content Security Policy helper functions"

$c = @'
// XSS Protection utilities
export function escapeHtml(str: string): string {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

export function sanitizeUrl(url: string): string {
  try {
    const parsed = new URL(url);
    if (!['http:', 'https:'].includes(parsed.protocol)) return '';
    return parsed.href;
  } catch {
    return '';
  }
}

export function stripScriptTags(html: string): string {
  return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
}

export function sanitizeMarkdown(md: string): string {
  return md.replace(/javascript:/gi, '').replace(/on\w+=/gi, '');
}
'@
Set-Content -Path "src/security/xss.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "security: add XSS protection and HTML sanitization"

$c = @'
// API Key security utilities
export function maskApiKey(key: string): string {
  if (key.length <= 8) return '****';
  return key.slice(0, 4) + '****' + key.slice(-4);
}

export function isKeyExposed(key: string, text: string): boolean {
  return text.includes(key);
}

export function validateKeyFormat(key: string, provider: string): { valid: boolean; error?: string } {
  if (!key || key.trim().length === 0) {
    return { valid: false, error: 'API key is required' };
  }
  if (provider === 'huggingface' && !key.startsWith('hf_')) {
    return { valid: false, error: 'Hugging Face key must start with hf_' };
  }
  if (provider === 'groq' && !key.startsWith('gsk_')) {
    return { valid: false, error: 'Groq key must start with gsk_' };
  }
  if (key.length < 10) {
    return { valid: false, error: 'API key is too short' };
  }
  return { valid: true };
}
'@
Set-Content -Path "src/security/api-key.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "security: add API key validation and masking utilities"

$c = @'
// Rate limiting client-side protection
export class RateLimiter {
  private timestamps: number[] = [];
  private maxRequests: number;
  private windowMs: number;

  constructor(maxRequests: number, windowMs: number) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  canMakeRequest(): boolean {
    const now = Date.now();
    this.timestamps = this.timestamps.filter(t => now - t < this.windowMs);
    return this.timestamps.length < this.maxRequests;
  }

  recordRequest(): void {
    this.timestamps.push(Date.now());
  }

  getRemaining(): number {
    const now = Date.now();
    this.timestamps = this.timestamps.filter(t => now - t < this.windowMs);
    return Math.max(0, this.maxRequests - this.timestamps.length);
  }

  getResetTime(): number {
    if (this.timestamps.length === 0) return 0;
    return this.timestamps[0] + this.windowMs - Date.now();
  }
}
'@
Set-Content -Path "src/security/rate-limiter.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "security: add client-side rate limiter class"

$c = @'
// Security module barrel exports
export { generateCSPMeta, injectCSPMeta } from './csp';
export { escapeHtml, sanitizeUrl, stripScriptTags, sanitizeMarkdown } from './xss';
export { maskApiKey, isKeyExposed, validateKeyFormat } from './api-key';
export { RateLimiter } from './rate-limiter';
'@
Set-Content -Path "src/security/index.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "security: add barrel exports for security module"

git checkout main
git merge --no-ff feature/security -m "merge: add security hardening - CSP, XSS protection, rate limiting (#3)"
git branch -d feature/security

Write-Host "Phase 3 done: Security (5 commits + 1 merge)" -ForegroundColor Green

# =============================================
# PHASE 4: Error Boundaries & Logging (7 commits + 1 merge)
# =============================================
git checkout -b feature/error-handling

New-Item -ItemType Directory -Force -Path "src/logging" | Out-Null

$c = @'
// Application logger with levels
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LOG_COLORS: Record<LogLevel, string> = {
  debug: '#8b5cf6',
  info: '#6366f1',
  warn: '#f59e0b',
  error: '#ef4444',
};

let currentLevel: LogLevel = 'info';
const logHistory: { level: LogLevel; message: string; timestamp: number }[] = [];

export function setLogLevel(level: LogLevel): void { currentLevel = level; }

export function log(level: LogLevel, message: string, ...args: unknown[]): void {
  const levels: LogLevel[] = ['debug', 'info', 'warn', 'error'];
  if (levels.indexOf(level) < levels.indexOf(currentLevel)) return;
  const prefix = '%c[UML-Gen][' + level.toUpperCase() + ']';
  console[level === 'debug' ? 'log' : level](prefix, 'color:' + LOG_COLORS[level], message, ...args);
  logHistory.push({ level, message, timestamp: Date.now() });
  if (logHistory.length > 500) logHistory.splice(0, 250);
}

export function debug(msg: string, ...a: unknown[]): void { log('debug', msg, ...a); }
export function info(msg: string, ...a: unknown[]): void { log('info', msg, ...a); }
export function warn(msg: string, ...a: unknown[]): void { log('warn', msg, ...a); }
export function error(msg: string, ...a: unknown[]): void { log('error', msg, ...a); }
export function getLogHistory() { return [...logHistory]; }
'@
Set-Content -Path "src/logging/logger.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "feat(logging): add structured application logger with levels"

$c = @'
// Global error handler
import { error as logError } from './logger';

export function setupGlobalErrorHandler(): void {
  window.addEventListener('error', (event) => {
    logError('Uncaught error: ' + event.message, {
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
    });
  });

  window.addEventListener('unhandledrejection', (event) => {
    logError('Unhandled promise rejection: ' + String(event.reason));
  });
}

export function wrapAsync<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  return fn().catch((err) => {
    logError('Async error caught: ' + String(err));
    return fallback;
  });
}
'@
Set-Content -Path "src/logging/error-handler.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "feat(logging): add global error and promise rejection handlers"

$c = @'
// Logging module barrel exports
export { setLogLevel, log, debug, info, warn, error, getLogHistory } from './logger';
export { setupGlobalErrorHandler, wrapAsync } from './error-handler';
'@
Set-Content -Path "src/logging/index.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "feat(logging): add barrel exports for logging module"

git checkout main
git merge --no-ff feature/error-handling -m "merge: add structured logging and global error handling (#4)"
git branch -d feature/error-handling

Write-Host "Phase 4 done: Logging (3 commits + 1 merge)" -ForegroundColor Green

# =============================================
# PHASE 5: State Management (6 commits + 1 merge)
# =============================================
git checkout -b feature/state-management

New-Item -ItemType Directory -Force -Path "src/state" | Out-Null

$c = @'
// Simple reactive store
type Listener<T> = (state: T) => void;

export class Store<T> {
  private state: T;
  private listeners: Set<Listener<T>> = new Set();

  constructor(initialState: T) {
    this.state = initialState;
  }

  getState(): T {
    return this.state;
  }

  setState(partial: Partial<T>): void {
    this.state = { ...this.state, ...partial };
    this.notify();
  }

  subscribe(listener: Listener<T>): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    this.listeners.forEach(fn => fn(this.state));
  }

  reset(initialState: T): void {
    this.state = initialState;
    this.notify();
  }
}
'@
Set-Content -Path "src/state/store.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "feat(state): add reactive store class with subscribe/notify"

$c = @'
// Application state definition
import { Store } from './store';

export interface AppState {
  currentTab: string;
  isGenerating: boolean;
  isFullscreen: boolean;
  zoomLevel: number;
  provider: string;
  apiKeySet: boolean;
  toastQueue: string[];
  codePanelOpen: boolean;
  locale: string;
}

export const initialState: AppState = {
  currentTab: 'usecase',
  isGenerating: false,
  isFullscreen: false,
  zoomLevel: 100,
  provider: 'huggingface',
  apiKeySet: false,
  toastQueue: [],
  codePanelOpen: false,
  locale: 'vi',
};

export const appStore = new Store<AppState>(initialState);
'@
Set-Content -Path "src/state/app-state.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "feat(state): define application state schema and initial values"

$c = @'
// State selectors - derived state accessors
import { appStore } from './app-state';

export const selectCurrentTab = () => appStore.getState().currentTab;
export const selectIsGenerating = () => appStore.getState().isGenerating;
export const selectIsFullscreen = () => appStore.getState().isFullscreen;
export const selectZoomLevel = () => appStore.getState().zoomLevel;
export const selectProvider = () => appStore.getState().provider;
export const selectApiKeySet = () => appStore.getState().apiKeySet;
export const selectLocale = () => appStore.getState().locale;
export const selectCodePanelOpen = () => appStore.getState().codePanelOpen;
'@
Set-Content -Path "src/state/selectors.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "feat(state): add state selector functions for derived data"

$c = @'
// State module barrel exports
export { Store } from './store';
export { appStore, initialState } from './app-state';
export type { AppState } from './app-state';
export * from './selectors';
'@
Set-Content -Path "src/state/index.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "feat(state): add barrel exports for state management module"

git checkout main
git merge --no-ff feature/state-management -m "merge: add reactive state management system (#5)"
git branch -d feature/state-management

Write-Host "Phase 5 done: State Management (4 commits + 1 merge)" -ForegroundColor Green

# =============================================
# PHASE 6: Middleware & Plugins (6 commits + 1 merge)
# =============================================
git checkout -b feature/middleware

New-Item -ItemType Directory -Force -Path "src/middleware" | Out-Null

$c = @'
// Request middleware pipeline
export type Middleware = (context: RequestContext, next: () => Promise<void>) => Promise<void>;

export interface RequestContext {
  url: string;
  method: string;
  headers: Record<string, string>;
  body?: string;
  response?: Response;
  startTime: number;
  metadata: Record<string, unknown>;
}

export class MiddlewarePipeline {
  private middlewares: Middleware[] = [];

  use(middleware: Middleware): this {
    this.middlewares.push(middleware);
    return this;
  }

  async execute(context: RequestContext): Promise<void> {
    let index = 0;
    const next = async (): Promise<void> => {
      if (index < this.middlewares.length) {
        const mw = this.middlewares[index++];
        await mw(context, next);
      }
    };
    await next();
  }
}
'@
Set-Content -Path "src/middleware/pipeline.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "feat(middleware): add request middleware pipeline system"

$c = @'
// Built-in middleware: logging, retry, timeout
import type { Middleware, RequestContext } from './pipeline';

export const loggingMiddleware: Middleware = async (ctx: RequestContext, next) => {
  console.debug('[API]', ctx.method, ctx.url);
  await next();
  const duration = performance.now() - ctx.startTime;
  console.debug('[API] Response:', duration.toFixed(0) + 'ms');
};

export const retryMiddleware = (maxRetries: number): Middleware => {
  return async (ctx: RequestContext, next) => {
    let lastError: Error | null = null;
    for (let i = 0; i <= maxRetries; i++) {
      try {
        await next();
        return;
      } catch (err) {
        lastError = err instanceof Error ? err : new Error(String(err));
        if (i < maxRetries) await new Promise(r => setTimeout(r, 1000 * (i + 1)));
      }
    }
    throw lastError;
  };
};

export const timeoutMiddleware = (ms: number): Middleware => {
  return async (ctx: RequestContext, next) => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), ms);
    ctx.metadata.signal = controller.signal;
    try { await next(); } finally { clearTimeout(timer); }
  };
};
'@
Set-Content -Path "src/middleware/built-in.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "feat(middleware): add logging, retry, and timeout middlewares"

$c = @'
// Middleware module barrel exports
export { MiddlewarePipeline } from './pipeline';
export type { Middleware, RequestContext } from './pipeline';
export { loggingMiddleware, retryMiddleware, timeoutMiddleware } from './built-in';
'@
Set-Content -Path "src/middleware/index.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "feat(middleware): add barrel exports for middleware module"

git checkout main
git merge --no-ff feature/middleware -m "merge: add request middleware pipeline with built-in middlewares (#6)"
git branch -d feature/middleware

Write-Host "Phase 6 done: Middleware (3 commits + 1 merge)" -ForegroundColor Green

# =============================================
# PHASE 7: More Documentation & Config (10 commits + 1 merge)
# =============================================
git checkout -b feature/docs-v2

$c = @'
# Contributing to UML Generator

## Development Setup
1. Fork the repository
2. Clone your fork
3. Run `npm install`
4. Start dev server: `npm run dev`

## Branch Naming
- `feature/*` - New features
- `fix/*` - Bug fixes
- `docs/*` - Documentation updates
- `perf/*` - Performance improvements
- `security/*` - Security fixes

## Commit Convention
We use Conventional Commits:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` CSS/formatting
- `refactor:` Code restructure
- `perf:` Performance
- `test:` Tests
- `chore:` Maintenance

## Pull Request Process
1. Create a feature branch
2. Make your changes
3. Write/update tests
4. Submit PR with description
5. Wait for review
'@
Set-Content -Path "CONTRIBUTING.md" -Value $c -Encoding UTF8
git add -A; git commit -m "docs: rewrite CONTRIBUTING.md with branch naming and commit conventions"

$c = @'
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "bierner.markdown-mermaid",
    "streetsidesoftware.code-spell-checker"
  ]
}
'@
New-Item -ItemType Directory -Force -Path ".vscode" | Out-Null
Set-Content -Path ".vscode/extensions.json" -Value $c -Encoding UTF8
git add -A; git commit -m "chore: add VS Code recommended extensions list"

$c = @'
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "files.eol": "\n",
  "editor.tabSize": 2
}
'@
Set-Content -Path ".vscode/settings.json" -Value $c -Encoding UTF8
git add -A; git commit -m "chore: add VS Code workspace settings for consistent dev environment"

$c = @'
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/src"
    }
  ]
}
'@
Set-Content -Path ".vscode/launch.json" -Value $c -Encoding UTF8
git add -A; git commit -m "chore: add VS Code debug configuration for Chrome"

$c = @'
# Development Environment Setup

## Prerequisites
- Node.js >= 18
- npm >= 9
- Git

## Quick Start
```bash
git clone https://github.com/maitamdev/uml-gen.git
cd uml-gen
npm install
npm run dev
```

## API Key Setup
1. Get a free API key from Hugging Face
2. Click the settings icon in the app
3. Paste your key and click Save

## Running Tests
```bash
npm run test
```

## Building
```bash
npm run build
```

## Project Structure
See [ARCHITECTURE.md](./docs/ARCHITECTURE.md) for details.
'@
Set-Content -Path "docs/DEVELOPMENT.md" -Value $c -Encoding UTF8
git add -A; git commit -m "docs: add development environment setup guide"

$c = @'
# Migration Guide

## From v0.x to v1.0

### Breaking Changes
- API key storage format changed (keys are now stored per-provider)
- DiagramSet type now includes optional fields

### New Features
- Dual AI provider support with auto-failover
- i18n internationalization system
- State management with reactive store
- Middleware pipeline for API requests
- Security hardening (CSP, XSS protection)

### Migration Steps
1. Clear localStorage (`localStorage.clear()`)
2. Re-enter your API key in the settings panel
3. No code changes needed for template usage
'@
Set-Content -Path "docs/MIGRATION.md" -Value $c -Encoding UTF8
git add -A; git commit -m "docs: add migration guide from v0.x to v1.0"

$c = @'
{
  "*.ts": ["eslint --fix", "prettier --write"],
  "*.css": ["prettier --write"],
  "*.md": ["prettier --write"],
  "*.json": ["prettier --write"]
}
'@
Set-Content -Path ".lintstagedrc.json" -Value $c -Encoding UTF8
git add -A; git commit -m "chore: add lint-staged configuration for pre-commit checks"

git checkout main
git merge --no-ff feature/docs-v2 -m "merge: enhanced documentation and dev tooling configuration (#7)"
git branch -d feature/docs-v2

Write-Host "Phase 7 done: Docs v2 (7 commits + 1 merge)" -ForegroundColor Green

# =============================================
# PHASE 8: Testing Enhancements (8 commits + 1 merge)
# =============================================
git checkout -b feature/more-tests

$c = @'
// Tab controller tests
import { describe, it, expect, vi } from 'vitest';
import { TabController } from '../../components/tabs.component';

describe('TabController', () => {
  const tabs = [
    { type: 'usecase', label: 'Use Case', icon: 'U' },
    { type: 'activity', label: 'Activity', icon: 'A' },
    { type: 'sequence', label: 'Sequence', icon: 'S' },
  ];

  it('initializes with default tab', () => {
    const onChange = vi.fn();
    const ctrl = new TabController(tabs, 'usecase', onChange);
    expect(ctrl.getActiveTab()).toBe('usecase');
  });

  it('switches to next tab', () => {
    const onChange = vi.fn();
    const ctrl = new TabController(tabs, 'usecase', onChange);
    ctrl.nextTab();
    expect(ctrl.getActiveTab()).toBe('activity');
  });

  it('wraps around on next', () => {
    const onChange = vi.fn();
    const ctrl = new TabController(tabs, 'sequence', onChange);
    ctrl.nextTab();
    expect(ctrl.getActiveTab()).toBe('usecase');
  });

  it('switches to previous tab', () => {
    const onChange = vi.fn();
    const ctrl = new TabController(tabs, 'activity', onChange);
    ctrl.prevTab();
    expect(ctrl.getActiveTab()).toBe('usecase');
  });
});
'@
Set-Content -Path "src/__tests__/components/tabs.test.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "test(components): add tab controller component tests"

$c = @'
// ZoomController tests
import { describe, it, expect, vi } from 'vitest';
import { ZoomController } from '../../components/zoom-controls.component';

describe('ZoomController', () => {
  const config = { min: 25, max: 200, step: 25, default: 100 };

  it('initializes with default level', () => {
    const ctrl = new ZoomController(config, vi.fn());
    expect(ctrl.getLevel()).toBe(100);
  });

  it('zooms in by step', () => {
    const ctrl = new ZoomController(config, vi.fn());
    ctrl.zoomIn();
    expect(ctrl.getLevel()).toBe(125);
  });

  it('zooms out by step', () => {
    const ctrl = new ZoomController(config, vi.fn());
    ctrl.zoomOut();
    expect(ctrl.getLevel()).toBe(75);
  });

  it('clamps to max', () => {
    const ctrl = new ZoomController(config, vi.fn());
    ctrl.setLevel(300);
    expect(ctrl.getLevel()).toBe(200);
  });

  it('resets to 100', () => {
    const ctrl = new ZoomController(config, vi.fn());
    ctrl.zoomIn();
    ctrl.reset();
    expect(ctrl.getLevel()).toBe(100);
  });

  it('returns percentage string', () => {
    const ctrl = new ZoomController(config, vi.fn());
    expect(ctrl.getPercentage()).toBe('100%');
  });
});
'@
Set-Content -Path "src/__tests__/components/zoom.test.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "test(components): add zoom controller component tests"

$c = @'
// Store (state management) tests
import { describe, it, expect, vi } from 'vitest';
import { Store } from '../../state/store';

describe('Store', () => {
  it('initializes with state', () => {
    const store = new Store({ count: 0 });
    expect(store.getState().count).toBe(0);
  });

  it('updates state partially', () => {
    const store = new Store({ a: 1, b: 2 });
    store.setState({ a: 10 });
    expect(store.getState()).toEqual({ a: 10, b: 2 });
  });

  it('notifies subscribers on change', () => {
    const store = new Store({ x: 0 });
    const listener = vi.fn();
    store.subscribe(listener);
    store.setState({ x: 5 });
    expect(listener).toHaveBeenCalledWith({ x: 5 });
  });

  it('unsubscribes correctly', () => {
    const store = new Store({ x: 0 });
    const listener = vi.fn();
    const unsub = store.subscribe(listener);
    unsub();
    store.setState({ x: 5 });
    expect(listener).not.toHaveBeenCalled();
  });

  it('resets to initial state', () => {
    const store = new Store({ v: 1 });
    store.setState({ v: 99 });
    store.reset({ v: 1 });
    expect(store.getState().v).toBe(1);
  });
});
'@
Set-Content -Path "src/__tests__/state/store.test.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "test(state): add reactive store unit tests"

$c = @'
// Security XSS tests
import { describe, it, expect } from 'vitest';
import { escapeHtml, sanitizeUrl, stripScriptTags } from '../../security/xss';

describe('escapeHtml', () => {
  it('escapes angle brackets', () => {
    expect(escapeHtml('<div>')).toBe('&lt;div&gt;');
  });
});

describe('sanitizeUrl', () => {
  it('allows https URLs', () => {
    expect(sanitizeUrl('https://example.com')).toBe('https://example.com/');
  });
  it('blocks javascript URLs', () => {
    expect(sanitizeUrl('javascript:alert(1)')).toBe('');
  });
});

describe('stripScriptTags', () => {
  it('removes script elements', () => {
    expect(stripScriptTags('hello<script>alert(1)</script>world')).toBe('helloworld');
  });
});
'@
New-Item -ItemType Directory -Force -Path "src/__tests__/security" | Out-Null
Set-Content -Path "src/__tests__/security/xss.test.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "test(security): add XSS protection utility tests"

$c = @'
// Rate limiter tests
import { describe, it, expect, vi } from 'vitest';
import { RateLimiter } from '../../security/rate-limiter';

describe('RateLimiter', () => {
  it('allows requests within limit', () => {
    const limiter = new RateLimiter(3, 60000);
    expect(limiter.canMakeRequest()).toBe(true);
  });

  it('blocks after exceeding limit', () => {
    const limiter = new RateLimiter(2, 60000);
    limiter.recordRequest();
    limiter.recordRequest();
    expect(limiter.canMakeRequest()).toBe(false);
  });

  it('tracks remaining requests', () => {
    const limiter = new RateLimiter(5, 60000);
    limiter.recordRequest();
    limiter.recordRequest();
    expect(limiter.getRemaining()).toBe(3);
  });
});
'@
Set-Content -Path "src/__tests__/security/rate-limiter.test.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "test(security): add rate limiter unit tests"

git checkout main
git merge --no-ff feature/more-tests -m "merge: comprehensive test suite - components, state, security (#8)"
git branch -d feature/more-tests

Write-Host "Phase 8 done: More Tests (5 commits + 1 merge)" -ForegroundColor Green

# =============================================
# PHASE 9: Final Polish (10 commits + 1 merge)
# =============================================
git checkout -b feature/final-polish

# Update README with badges
$readme = Get-Content "README.md" -Raw
if (-not $readme.StartsWith("![CI]")) {
    $badges = @'
![CI](https://github.com/maitamdev/uml-gen/actions/workflows/ci.yml/badge.svg)
![License](https://img.shields.io/github/license/maitamdev/uml-gen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)

'@
    $readme = $badges + $readme
    Set-Content -Path "README.md" -Value $readme -Encoding UTF8
}
git add -A; git commit -m "docs(readme): add CI status, license, version, and PR badges"

$c = @'
// App initialization module - centralizes startup logic
import { preconnectAPIs } from '../performance/preloader';

export function bootstrapApp(): void {
  preconnectAPIs();
  registerServiceWorker();
  applyStoredPreferences();
}

function registerServiceWorker(): void {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      console.debug('Service worker registration skipped');
    });
  }
}

function applyStoredPreferences(): void {
  const theme = localStorage.getItem('uml-gen-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', theme);
  const locale = localStorage.getItem('uml-gen-locale') || 'vi';
  document.documentElement.lang = locale;
}
'@
New-Item -ItemType Directory -Force -Path "src/bootstrap" | Out-Null
Set-Content -Path "src/bootstrap/init.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "feat(bootstrap): add centralized app initialization module"

$c = @'
// Service Worker for offline caching
const CACHE_NAME = 'uml-gen-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/src/main.ts',
  '/src/style.css',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(names =>
      Promise.all(names.filter(n => n !== CACHE_NAME).map(n => caches.delete(n)))
    )
  );
});
'@
Set-Content -Path "public/sw.js" -Value $c -Encoding UTF8
git add -A; git commit -m "feat(pwa): add service worker for offline caching support"

$c = @'
// Feature flags system
interface FeatureFlags {
  enableAnalytics: boolean;
  enablePWA: boolean;
  enableI18n: boolean;
  enableDarkMode: boolean;
  enableExportPDF: boolean;
  debugMode: boolean;
}

const defaultFlags: FeatureFlags = {
  enableAnalytics: false,
  enablePWA: true,
  enableI18n: true,
  enableDarkMode: true,
  enableExportPDF: false,
  debugMode: false,
};

export function getFeatureFlags(): FeatureFlags {
  try {
    const stored = localStorage.getItem('uml-gen-flags');
    return stored ? { ...defaultFlags, ...JSON.parse(stored) } : defaultFlags;
  } catch {
    return defaultFlags;
  }
}

export function isFeatureEnabled(flag: keyof FeatureFlags): boolean {
  return getFeatureFlags()[flag];
}

export function setFeatureFlag(flag: keyof FeatureFlags, enabled: boolean): void {
  const flags = getFeatureFlags();
  flags[flag] = enabled;
  localStorage.setItem('uml-gen-flags', JSON.stringify(flags));
}
'@
New-Item -ItemType Directory -Force -Path "src/config" | Out-Null
Set-Content -Path "src/config/feature-flags.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "feat(config): add feature flags system for progressive rollout"

$c = @'
// Application version and build info
export const APP_VERSION = '1.0.0';
export const APP_NAME = 'UML Diagram Generator';
export const APP_AUTHOR = 'MaiTamDev';
export const APP_REPO = 'https://github.com/maitamdev/uml-gen';
export const APP_LICENSE = 'MIT';
export const BUILD_DATE = new Date().toISOString().split('T')[0];

export function getAppInfo() {
  return {
    name: APP_NAME,
    version: APP_VERSION,
    author: APP_AUTHOR,
    repo: APP_REPO,
    license: APP_LICENSE,
    buildDate: BUILD_DATE,
  };
}
'@
Set-Content -Path "src/config/app-info.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "feat(config): add application version and build info constants"

$c = @'
// Config module barrel exports
export { getFeatureFlags, isFeatureEnabled, setFeatureFlag } from './feature-flags';
export { APP_VERSION, APP_NAME, APP_AUTHOR, APP_REPO, getAppInfo } from './app-info';
'@
Set-Content -Path "src/config/index.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "feat(config): add barrel exports for config module"

$c = @'
// Keyboard shortcut help panel data
export const SHORTCUT_HELP = [
  { keys: ['Ctrl', 'Enter'], action: 'Generate diagrams' },
  { keys: ['Ctrl', 'Shift', 'C'], action: 'Copy Mermaid code' },
  { keys: ['Ctrl', 'Shift', 'P'], action: 'Export as PNG' },
  { keys: ['Ctrl', 'Shift', 'S'], action: 'Export as SVG' },
  { keys: ['Ctrl', '`'], action: 'Toggle code panel' },
  { keys: ['Ctrl', '+'], action: 'Zoom in' },
  { keys: ['Ctrl', '-'], action: 'Zoom out' },
  { keys: ['Ctrl', '0'], action: 'Reset zoom' },
  { keys: ['Esc'], action: 'Close modal / Exit fullscreen' },
];

export function formatShortcut(keys: string[]): string {
  return keys.join(' + ');
}
'@
Set-Content -Path "src/constants/shortcuts-help.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "feat(constants): add keyboard shortcut help panel data"

# Final version bump
$pkg = Get-Content "package.json" -Raw
$pkg = $pkg -replace '"version": "1.0.0"', '"version": "1.1.0"'
Set-Content -Path "package.json" -Value $pkg -Encoding UTF8
git add -A; git commit -m "chore: bump version to 1.1.0 with new modules and features"

git checkout main
git merge --no-ff feature/final-polish -m "merge: final polish - PWA, feature flags, bootstrap, shortcuts (#9)"
git branch -d feature/final-polish

Write-Host "Phase 9 done: Final Polish (9 commits + 1 merge)" -ForegroundColor Green
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host " ALL PHASES COMPLETE!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
