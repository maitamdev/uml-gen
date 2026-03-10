$ErrorActionPreference = "Stop"
Set-Location "c:\Users\Asus\.gemini\antigravity\scratch\uml-generator"

# ---- Commit 22: dom.utils.ts ----
$domContent = @'
// DOM utility functions
export function qs(selector: string): HTMLElement {
  const el = document.querySelector<HTMLElement>(selector);
  if (!el) throw new Error('Element not found: ' + selector);
  return el;
}

export function qsa(selector: string): HTMLElement[] {
  return Array.from(document.querySelectorAll<HTMLElement>(selector));
}

export function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs?: Record<string, string>,
  children?: (string | HTMLElement)[]
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  if (attrs) Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  if (children) children.forEach(c => typeof c === 'string' ? el.appendChild(document.createTextNode(c)) : el.appendChild(c));
  return el;
}

export function toggleClass(el: HTMLElement, className: string, force?: boolean): boolean {
  return el.classList.toggle(className, force);
}

export function isVisible(el: HTMLElement): boolean {
  return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
}
'@
Set-Content -Path "src/utils/dom.utils.ts" -Value $domContent -Encoding UTF8
git add -A; git commit -m "feat(utils): add DOM query and manipulation helpers"

# ---- Commit 23: clipboard.utils.ts ----
$clipContent = @'
// Clipboard utility functions
export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return fallbackCopy(text);
  }
}

function fallbackCopy(text: string): boolean {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  Object.assign(textarea.style, { position: 'fixed', opacity: '0', pointerEvents: 'none' });
  document.body.appendChild(textarea);
  textarea.select();
  const ok = document.execCommand('copy');
  document.body.removeChild(textarea);
  return ok;
}

export async function readClipboard(): Promise<string | null> {
  try {
    return await navigator.clipboard.readText();
  } catch {
    return null;
  }
}
'@
Set-Content -Path "src/utils/clipboard.utils.ts" -Value $clipContent -Encoding UTF8
git add -A; git commit -m "feat(utils): add clipboard read/write with fallback support"

# ---- Commit 24: storage.utils.ts ----
$storageContent = @'
// LocalStorage wrapper with JSON support and expiry
const PREFIX = 'uml-gen-';

export function getItem<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    if (raw === null) return fallback;
    const parsed = JSON.parse(raw);
    if (parsed.expiry && Date.now() > parsed.expiry) {
      localStorage.removeItem(PREFIX + key);
      return fallback;
    }
    return parsed.value as T;
  } catch {
    return fallback;
  }
}

export function setItem<T>(key: string, value: T, ttlMs?: number): void {
  const data = { value, expiry: ttlMs ? Date.now() + ttlMs : null };
  localStorage.setItem(PREFIX + key, JSON.stringify(data));
}

export function removeItem(key: string): void {
  localStorage.removeItem(PREFIX + key);
}

export function clearAll(): void {
  Object.keys(localStorage)
    .filter(k => k.startsWith(PREFIX))
    .forEach(k => localStorage.removeItem(k));
}
'@
Set-Content -Path "src/utils/storage.utils.ts" -Value $storageContent -Encoding UTF8
git add -A; git commit -m "feat(utils): add localStorage wrapper with JSON and TTL support"

# ---- Commit 25: validation.utils.ts ----
$validContent = @'
// Input validation utilities
export function isNonEmpty(value: string): boolean {
  return value.trim().length > 0;
}

export function isValidApiKey(key: string, provider: string): boolean {
  if (provider === 'huggingface') return /^hf_[a-zA-Z0-9]{10,}$/.test(key);
  if (provider === 'groq') return /^gsk_[a-zA-Z0-9]{10,}$/.test(key);
  return key.length > 10;
}

export function isValidUrl(url: string): boolean {
  try { new URL(url); return true; } catch { return false; }
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function isWithinRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

export function sanitizeInput(input: string): string {
  return input.replace(/<[^>]*>/g, '').trim();
}
'@
Set-Content -Path "src/utils/validation.utils.ts" -Value $validContent -Encoding UTF8
git add -A; git commit -m "feat(utils): add input validation and sanitization functions"

# ---- Commit 26: date.utils.ts ----
$dateContent = @'
// Date formatting utilities
export function formatTimestamp(ts: number): string {
  return new Date(ts).toLocaleString('vi-VN', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit',
  });
}

export function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return 'vua xong';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return minutes + ' phut truoc';
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return hours + ' gio truoc';
  const days = Math.floor(hours / 24);
  return days + ' ngay truoc';
}

export function formatDuration(ms: number): string {
  if (ms < 1000) return ms + 'ms';
  return (ms / 1000).toFixed(1) + 's';
}
'@
Set-Content -Path "src/utils/date.utils.ts" -Value $dateContent -Encoding UTF8
git add -A; git commit -m "feat(utils): add date formatting and time-ago helpers"

# ---- Commit 27: error.utils.ts ----
$errorContent = @'
// Error handling utilities
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return 'An unknown error occurred';
}

export function isNetworkError(error: unknown): boolean {
  if (error instanceof TypeError && error.message.includes('fetch')) return true;
  if (error instanceof Error && error.message.includes('network')) return true;
  return false;
}

export function isRateLimitError(status: number): boolean {
  return status === 429 || status === 402;
}

export function createAppError(message: string, code: string, recoverable = true) {
  return { message, code, recoverable, timestamp: Date.now() };
}

export function formatApiError(status: number, provider: string): string {
  if (status === 401) return 'API Key invalid for ' + provider;
  if (status === 429) return 'Rate limit exceeded for ' + provider;
  if (status === 402) return 'Free quota exhausted for ' + provider;
  if (status >= 500) return 'Server error from ' + provider;
  return 'Unknown error (' + status + ')';
}
'@
Set-Content -Path "src/utils/error.utils.ts" -Value $errorContent -Encoding UTF8
git add -A; git commit -m "feat(utils): add error handling and message formatting helpers"

# ---- Commit 28: download.utils.ts ----
$dlContent = @'
// File download utilities
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function downloadText(content: string, filename: string, mimeType = 'text/plain'): void {
  const blob = new Blob([content], { type: mimeType });
  downloadBlob(blob, filename);
}

export function downloadSvg(svgString: string, filename: string): void {
  downloadText(svgString, filename + '.svg', 'image/svg+xml');
}

export function generateFilename(prefix: string, extension: string): string {
  const date = new Date().toISOString().slice(0, 10);
  const time = new Date().toISOString().slice(11, 19).replace(/:/g, '-');
  return prefix + '-' + date + '-' + time + '.' + extension;
}
'@
Set-Content -Path "src/utils/download.utils.ts" -Value $dlContent -Encoding UTF8
git add -A; git commit -m "feat(utils): add file download and blob generation helpers"

# ---- Commit 29: debounce.utils.ts ----
$debounceContent = @'
// Debounce and throttle utilities
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delayMs: number
): T & { cancel: () => void } {
  let timer: ReturnType<typeof setTimeout> | null = null;
  const debounced = ((...args: unknown[]) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delayMs);
  }) as T & { cancel: () => void };
  debounced.cancel = () => { if (timer) clearTimeout(timer); };
  return debounced;
}

export function throttle<T extends (...args: unknown[]) => void>(
  fn: T,
  limitMs: number
): T {
  let lastCall = 0;
  return ((...args: unknown[]) => {
    const now = Date.now();
    if (now - lastCall >= limitMs) {
      lastCall = now;
      fn(...args);
    }
  }) as T;
}

export function rafThrottle<T extends (...args: unknown[]) => void>(fn: T): T {
  let rafId: number | null = null;
  return ((...args: unknown[]) => {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      fn(...args);
      rafId = null;
    });
  }) as T;
}
'@
Set-Content -Path "src/utils/debounce.utils.ts" -Value $debounceContent -Encoding UTF8
git add -A; git commit -m "feat(utils): add debounce, throttle, and RAF throttle functions"

# ---- Commit 30: utils/index.ts ----
$indexContent = @'
// Barrel exports for all utility modules
export * from './string.utils';
export * from './dom.utils';
export * from './clipboard.utils';
export * from './storage.utils';
export * from './validation.utils';
export * from './date.utils';
export * from './error.utils';
export * from './download.utils';
export * from './debounce.utils';
'@
Set-Content -Path "src/utils/index.ts" -Value $indexContent -Encoding UTF8
git add -A; git commit -m "feat(utils): add barrel exports for all utility modules"

Write-Host "Batch 3 done: 9 commits (Utils 22-30)" -ForegroundColor Green
