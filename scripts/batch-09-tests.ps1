$ErrorActionPreference = "Stop"
Set-Location "c:\Users\Asus\.gemini\antigravity\scratch\uml-generator"
New-Item -ItemType Directory -Force -Path "src/__tests__/utils" | Out-Null
New-Item -ItemType Directory -Force -Path "src/__tests__/components" | Out-Null

# ---- Commit 81 ----
$c = @'
// String utility tests
import { describe, it, expect } from 'vitest';
import { truncate, sanitizeHtml, slugify, capitalize, countWords, removeExtraSpaces } from '../../utils/string.utils';

describe('truncate', () => {
  it('returns original string if within limit', () => { expect(truncate('hello', 10)).toBe('hello'); });
  it('truncates long strings with suffix', () => { expect(truncate('hello world', 8)).toBe('hello...'); });
  it('uses custom suffix', () => { expect(truncate('hello world', 8, '~')).toBe('hello w~'); });
});

describe('sanitizeHtml', () => {
  it('escapes HTML entities', () => { expect(sanitizeHtml('<b>test</b>')).toBe('&lt;b&gt;test&lt;/b&gt;'); });
  it('escapes quotes', () => { expect(sanitizeHtml('"hello"')).toBe('&quot;hello&quot;'); });
});

describe('slugify', () => {
  it('creates a URL-safe slug', () => { expect(slugify('Hello World')).toBe('hello-world'); });
  it('removes special characters', () => { expect(slugify('Test! @#$')).toBe('test'); });
});

describe('capitalize', () => {
  it('capitalizes first letter', () => { expect(capitalize('hello')).toBe('Hello'); });
});

describe('countWords', () => {
  it('counts words in a string', () => { expect(countWords('hello world test')).toBe(3); });
  it('handles empty string', () => { expect(countWords('')).toBe(0); });
});

describe('removeExtraSpaces', () => {
  it('collapses multiple spaces', () => { expect(removeExtraSpaces('hello   world')).toBe('hello world'); });
});
'@
Set-Content -Path "src/__tests__/utils/string.utils.test.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "test(utils): add string utility function tests"

# ---- Commit 82 ----
$c = @'
// Validation utility tests
import { describe, it, expect } from 'vitest';
import { isNonEmpty, isValidApiKey, isValidUrl, clamp, isWithinRange, sanitizeInput } from '../../utils/validation.utils';

describe('isNonEmpty', () => {
  it('returns true for non-empty string', () => { expect(isNonEmpty('hello')).toBe(true); });
  it('returns false for empty string', () => { expect(isNonEmpty('')).toBe(false); });
  it('returns false for whitespace only', () => { expect(isNonEmpty('   ')).toBe(false); });
});

describe('isValidApiKey', () => {
  it('validates Hugging Face keys', () => { expect(isValidApiKey('hf_abcdefghijklm', 'huggingface')).toBe(true); });
  it('rejects invalid HF keys', () => { expect(isValidApiKey('invalid', 'huggingface')).toBe(false); });
  it('validates Groq keys', () => { expect(isValidApiKey('gsk_abcdefghijklm', 'groq')).toBe(true); });
});

describe('isValidUrl', () => {
  it('validates URLs', () => { expect(isValidUrl('https://example.com')).toBe(true); });
  it('rejects invalid URLs', () => { expect(isValidUrl('not-a-url')).toBe(false); });
});

describe('clamp', () => {
  it('clamps value within range', () => { expect(clamp(150, 0, 100)).toBe(100); });
  it('returns value if within range', () => { expect(clamp(50, 0, 100)).toBe(50); });
  it('clamps to minimum', () => { expect(clamp(-5, 0, 100)).toBe(0); });
});

describe('isWithinRange', () => {
  it('returns true if within range', () => { expect(isWithinRange(50, 0, 100)).toBe(true); });
  it('returns false if out of range', () => { expect(isWithinRange(150, 0, 100)).toBe(false); });
});

describe('sanitizeInput', () => {
  it('strips HTML tags', () => { expect(sanitizeInput('<script>alert(1)</script>test')).toBe('alert(1)test'); });
});
'@
Set-Content -Path "src/__tests__/utils/validation.utils.test.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "test(utils): add validation utility function tests"

# ---- Commit 83 ----
$c = @'
// Storage utility tests
import { describe, it, expect, beforeEach } from 'vitest';
import { getItem, setItem, removeItem, clearAll } from '../../utils/storage.utils';

describe('storage utils', () => {
  beforeEach(() => { localStorage.clear(); });

  it('stores and retrieves values', () => {
    setItem('test-key', 'hello');
    expect(getItem('test-key', '')).toBe('hello');
  });

  it('returns fallback for missing keys', () => {
    expect(getItem('missing', 'default')).toBe('default');
  });

  it('stores complex objects', () => {
    setItem('obj', { a: 1, b: 'test' });
    expect(getItem('obj', null)).toEqual({ a: 1, b: 'test' });
  });

  it('removes items', () => {
    setItem('to-remove', 'value');
    removeItem('to-remove');
    expect(getItem('to-remove', null)).toBeNull();
  });

  it('clears all prefixed items', () => {
    setItem('key1', 'a');
    setItem('key2', 'b');
    clearAll();
    expect(getItem('key1', null)).toBeNull();
    expect(getItem('key2', null)).toBeNull();
  });
});
'@
Set-Content -Path "src/__tests__/utils/storage.utils.test.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "test(utils): add localStorage wrapper tests"

# ---- Commit 84 ----
$c = @'
// DOM utility tests
import { describe, it, expect, beforeEach } from 'vitest';
import { createElement, toggleClass, isVisible } from '../../utils/dom.utils';

describe('createElement', () => {
  it('creates element with tag', () => {
    const el = createElement('div');
    expect(el.tagName).toBe('DIV');
  });

  it('sets attributes', () => {
    const el = createElement('input', { type: 'text', id: 'test-input' });
    expect(el.getAttribute('type')).toBe('text');
    expect(el.id).toBe('test-input');
  });

  it('adds text children', () => {
    const el = createElement('p', {}, ['Hello']);
    expect(el.textContent).toBe('Hello');
  });
});

describe('toggleClass', () => {
  it('toggles class on element', () => {
    const el = document.createElement('div');
    toggleClass(el, 'active');
    expect(el.classList.contains('active')).toBe(true);
    toggleClass(el, 'active');
    expect(el.classList.contains('active')).toBe(false);
  });

  it('forces class state', () => {
    const el = document.createElement('div');
    toggleClass(el, 'active', true);
    expect(el.classList.contains('active')).toBe(true);
  });
});
'@
Set-Content -Path "src/__tests__/utils/dom.utils.test.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "test(utils): add DOM utility function tests"

# ---- Commit 85 ----
$c = @'
// Debounce utility tests
import { describe, it, expect, vi } from 'vitest';
import { debounce, throttle } from '../../utils/debounce.utils';

describe('debounce', () => {
  it('delays execution', async () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const debounced = debounce(fn, 100);
    debounced();
    expect(fn).not.toHaveBeenCalled();
    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledOnce();
    vi.useRealTimers();
  });

  it('cancels pending calls', () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const debounced = debounce(fn, 100);
    debounced();
    debounced.cancel();
    vi.advanceTimersByTime(200);
    expect(fn).not.toHaveBeenCalled();
    vi.useRealTimers();
  });
});

describe('throttle', () => {
  it('limits call frequency', () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const throttled = throttle(fn, 100);
    throttled(); throttled(); throttled();
    expect(fn).toHaveBeenCalledOnce();
    vi.advanceTimersByTime(100);
    throttled();
    expect(fn).toHaveBeenCalledTimes(2);
    vi.useRealTimers();
  });
});
'@
Set-Content -Path "src/__tests__/utils/debounce.utils.test.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "test(utils): add debounce and throttle tests"

# ---- Commit 86 ----
$c = @'
// Error utility tests
import { describe, it, expect } from 'vitest';
import { getErrorMessage, isNetworkError, isRateLimitError, createAppError, formatApiError } from '../../utils/error.utils';

describe('getErrorMessage', () => {
  it('extracts message from Error', () => { expect(getErrorMessage(new Error('test'))).toBe('test'); });
  it('returns string directly', () => { expect(getErrorMessage('error')).toBe('error'); });
  it('returns default for unknown types', () => { expect(getErrorMessage(42)).toBe('An unknown error occurred'); });
});

describe('isRateLimitError', () => {
  it('detects 429 as rate limit', () => { expect(isRateLimitError(429)).toBe(true); });
  it('detects 402 as rate limit', () => { expect(isRateLimitError(402)).toBe(true); });
  it('rejects other status codes', () => { expect(isRateLimitError(200)).toBe(false); });
});

describe('createAppError', () => {
  it('creates structured error', () => {
    const err = createAppError('test error', 'ERR_TEST');
    expect(err.message).toBe('test error');
    expect(err.code).toBe('ERR_TEST');
    expect(err.recoverable).toBe(true);
  });
});

describe('formatApiError', () => {
  it('formats 401 error', () => { expect(formatApiError(401, 'Groq')).toContain('invalid'); });
  it('formats 429 error', () => { expect(formatApiError(429, 'HF')).toContain('Rate limit'); });
  it('formats 500 error', () => { expect(formatApiError(500, 'HF')).toContain('Server error'); });
});
'@
Set-Content -Path "src/__tests__/utils/error.utils.test.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "test(utils): add error handling utility tests"

# ---- Commit 87 ----
$c = @'
// Date utility tests
import { describe, it, expect } from 'vitest';
import { formatDuration } from '../../utils/date.utils';

describe('formatDuration', () => {
  it('formats milliseconds', () => { expect(formatDuration(500)).toBe('500ms'); });
  it('formats seconds', () => { expect(formatDuration(2500)).toBe('2.5s'); });
  it('formats exact second', () => { expect(formatDuration(1000)).toBe('1.0s'); });
});
'@
Set-Content -Path "src/__tests__/utils/date.utils.test.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "test(utils): add date formatting utility tests"

# ---- Commit 88 ----
$c = @'
// Toast component tests
import { describe, it, expect, beforeEach } from 'vitest';
import { showToast, clearAllToasts } from '../../components/toast.component';

describe('Toast Component', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="toastContainer"></div>';
  });

  it('creates toast element', () => {
    showToast({ message: 'Test toast', type: 'info' });
    const toasts = document.querySelectorAll('.toast');
    expect(toasts.length).toBe(1);
  });

  it('applies correct type class', () => {
    showToast({ message: 'Error', type: 'error' });
    const toast = document.querySelector('.toast');
    expect(toast?.classList.contains('toast-error')).toBe(true);
  });

  it('clears all toasts', () => {
    showToast({ message: 'A', type: 'info' });
    showToast({ message: 'B', type: 'success' });
    clearAllToasts();
    expect(document.querySelectorAll('.toast').length).toBe(0);
  });
});
'@
Set-Content -Path "src/__tests__/components/toast.test.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "test(components): add toast component tests"

# ---- Commit 89 ----
$c = @'
// Modal component tests
import { describe, it, expect, beforeEach } from 'vitest';
import { createModal, closeModal } from '../../components/modal.component';

describe('Modal Component', () => {
  beforeEach(() => { document.body.innerHTML = ''; });

  it('creates modal with title and content', () => {
    const modal = createModal({ title: 'Test', content: 'Body content' });
    expect(modal.querySelector('.modal-title')?.textContent).toBe('Test');
    expect(modal.querySelector('.modal-body')?.textContent).toBe('Body content');
  });

  it('has close button', () => {
    const modal = createModal({ title: 'Test', content: 'Body' });
    expect(modal.querySelector('.modal-close')).not.toBeNull();
  });

  it('has confirm and cancel buttons', () => {
    const modal = createModal({ title: 'Test', content: 'Body', confirmText: 'OK', cancelText: 'Cancel' });
    expect(modal.querySelector('.modal-confirm')?.textContent).toBe('OK');
    expect(modal.querySelector('.modal-cancel')?.textContent).toBe('Cancel');
  });

  it('closes modal on call', () => {
    const modal = createModal({ title: 'Test', content: 'Body' });
    document.body.appendChild(modal);
    closeModal(modal);
    // Modal has transition, so still present but will be removed after timeout
    expect(modal.classList.contains('modal-visible')).toBe(false);
  });
});
'@
Set-Content -Path "src/__tests__/components/modal.test.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "test(components): add modal component tests"

# ---- Commit 90 ----
$c = @'
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['src/__tests__/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      include: ['src/utils/**', 'src/components/**'],
    },
  },
});
'@
Set-Content -Path "vitest.config.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "chore: add Vitest configuration for unit testing"

Write-Host "Batch 9 done: 10 commits (Tests)" -ForegroundColor Green
