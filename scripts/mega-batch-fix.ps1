$ErrorActionPreference = "Stop"
Set-Location "c:\Users\Asus\.gemini\antigravity\scratch\uml-generator"

# =============================================
# PHASE 8: More Tests (fixed)
# =============================================
git checkout -b feature/more-tests

New-Item -ItemType Directory -Force -Path "src/__tests__/state" | Out-Null
New-Item -ItemType Directory -Force -Path "src/__tests__/security" | Out-Null

$c = @'
import { describe, it, expect, vi } from 'vitest';
import { TabController } from '../../components/tabs.component';
describe('TabController', () => {
  const tabs = [
    { type: 'usecase', label: 'Use Case', icon: 'U' },
    { type: 'activity', label: 'Activity', icon: 'A' },
    { type: 'sequence', label: 'Sequence', icon: 'S' },
  ];
  it('initializes with default tab', () => {
    const ctrl = new TabController(tabs, 'usecase', vi.fn());
    expect(ctrl.getActiveTab()).toBe('usecase');
  });
  it('navigates next/prev correctly', () => {
    const ctrl = new TabController(tabs, 'usecase', vi.fn());
    ctrl.nextTab();
    expect(ctrl.getActiveTab()).toBe('activity');
    ctrl.prevTab();
    expect(ctrl.getActiveTab()).toBe('usecase');
  });
});
'@
Set-Content -Path "src/__tests__/components/tabs.test.ts" -Value $c -Encoding UTF8 -Force
git add -A; git commit -m "test(components): add tab controller navigation tests"

$c = @'
import { describe, it, expect, vi } from 'vitest';
import { ZoomController } from '../../components/zoom-controls.component';
describe('ZoomController', () => {
  const config = { min: 25, max: 200, step: 25, default: 100 };
  it('zooms in/out correctly', () => {
    const ctrl = new ZoomController(config, vi.fn());
    ctrl.zoomIn();
    expect(ctrl.getLevel()).toBe(125);
    ctrl.zoomOut();
    expect(ctrl.getLevel()).toBe(100);
  });
  it('clamps to range', () => {
    const ctrl = new ZoomController(config, vi.fn());
    ctrl.setLevel(999);
    expect(ctrl.getLevel()).toBe(200);
  });
  it('resets to 100', () => {
    const ctrl = new ZoomController(config, vi.fn());
    ctrl.zoomIn(); ctrl.reset();
    expect(ctrl.getLevel()).toBe(100);
  });
});
'@
Set-Content -Path "src/__tests__/components/zoom.test.ts" -Value $c -Encoding UTF8 -Force
git add -A; git commit -m "test(components): add zoom controller level tests"

$c = @'
import { describe, it, expect, vi } from 'vitest';
import { Store } from '../../state/store';
describe('Store', () => {
  it('manages state with partial updates', () => {
    const store = new Store({ a: 1, b: 2 });
    store.setState({ a: 10 });
    expect(store.getState()).toEqual({ a: 10, b: 2 });
  });
  it('notifies subscribers', () => {
    const store = new Store({ x: 0 });
    const fn = vi.fn();
    store.subscribe(fn);
    store.setState({ x: 5 });
    expect(fn).toHaveBeenCalledWith({ x: 5 });
  });
  it('supports unsubscribe', () => {
    const store = new Store({ x: 0 });
    const fn = vi.fn();
    const unsub = store.subscribe(fn);
    unsub();
    store.setState({ x: 5 });
    expect(fn).not.toHaveBeenCalled();
  });
});
'@
Set-Content -Path "src/__tests__/state/store.test.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "test(state): add reactive store subscribe/update tests"

$c = @'
import { describe, it, expect } from 'vitest';
import { escapeHtml, sanitizeUrl, stripScriptTags } from '../../security/xss';
describe('XSS Protection', () => {
  it('escapes HTML', () => { expect(escapeHtml('<b>hi</b>')).toContain('&lt;'); });
  it('blocks javascript: URLs', () => { expect(sanitizeUrl('javascript:alert(1)')).toBe(''); });
  it('allows https URLs', () => { expect(sanitizeUrl('https://x.com')).toBeTruthy(); });
  it('strips script tags', () => { expect(stripScriptTags('a<script>x</script>b')).toBe('ab'); });
});
'@
Set-Content -Path "src/__tests__/security/xss.test.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "test(security): add XSS protection unit tests"

$c = @'
import { describe, it, expect } from 'vitest';
import { RateLimiter } from '../../security/rate-limiter';
describe('RateLimiter', () => {
  it('allows within limit', () => {
    const rl = new RateLimiter(3, 60000);
    expect(rl.canMakeRequest()).toBe(true);
    expect(rl.getRemaining()).toBe(3);
  });
  it('blocks after exceeding limit', () => {
    const rl = new RateLimiter(2, 60000);
    rl.recordRequest(); rl.recordRequest();
    expect(rl.canMakeRequest()).toBe(false);
    expect(rl.getRemaining()).toBe(0);
  });
});
'@
Set-Content -Path "src/__tests__/security/rate-limiter.test.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "test(security): add rate limiter unit tests"

git checkout main
git merge --no-ff feature/more-tests -m "merge: comprehensive test suite - components, state, security (#8)"
git branch -d feature/more-tests

Write-Host "Phase 8 done" -ForegroundColor Green

# =============================================
# PHASE 9: Final Polish
# =============================================
git checkout -b feature/final-polish

$readme = Get-Content "README.md" -Raw
if (-not $readme.Contains("![CI]")) {
  $badges = "![CI](https://github.com/maitamdev/uml-gen/actions/workflows/ci.yml/badge.svg)`n![License](https://img.shields.io/github/license/maitamdev/uml-gen)`n![Version](https://img.shields.io/badge/version-1.1.0-blue)`n![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)`n`n"
  $readme = $badges + $readme
  Set-Content -Path "README.md" -Value $readme -Encoding UTF8
}
git add -A; git commit -m "docs(readme): add CI, license, version, and PR welcome badges"

New-Item -ItemType Directory -Force -Path "src/bootstrap" | Out-Null
$c = @'
// App bootstrapper - centralized startup
export function bootstrapApp(): void {
  registerServiceWorker();
  applyStoredPreferences();
}
function registerServiceWorker(): void {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  }
}
function applyStoredPreferences(): void {
  const theme = localStorage.getItem('uml-gen-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', theme);
}
'@
Set-Content -Path "src/bootstrap/init.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "feat(bootstrap): add centralized app initialization module"

$c = @'
const CACHE_NAME = 'uml-gen-v1';
const ASSETS = ['/', '/index.html'];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS))));
self.addEventListener('fetch', e => e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))));
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))));
'@
Set-Content -Path "public/sw.js" -Value $c -Encoding UTF8
git add -A; git commit -m "feat(pwa): add service worker for offline caching"

New-Item -ItemType Directory -Force -Path "src/config" | Out-Null
$c = @'
// Feature flags system
const defaults = { enablePWA: true, enableI18n: true, enableDarkMode: true, debugMode: false };
export function getFlags() { try { const s = localStorage.getItem('uml-gen-flags'); return s ? { ...defaults, ...JSON.parse(s) } : defaults; } catch { return defaults; } }
export function isEnabled(flag: string): boolean { return (getFlags() as Record<string, boolean>)[flag] ?? false; }
'@
Set-Content -Path "src/config/feature-flags.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "feat(config): add feature flags system for progressive rollout"

$c = @'
export const APP_VERSION = '1.1.0';
export const APP_NAME = 'UML Diagram Generator';
export const APP_AUTHOR = 'MaiTamDev';
export const APP_REPO = 'https://github.com/maitamdev/uml-gen';
export const getAppInfo = () => ({ name: APP_NAME, version: APP_VERSION, author: APP_AUTHOR, repo: APP_REPO });
'@
Set-Content -Path "src/config/app-info.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "feat(config): add app version and metadata constants"

$c = @'
export { getFlags, isEnabled } from './feature-flags';
export { APP_VERSION, APP_NAME, APP_AUTHOR, APP_REPO, getAppInfo } from './app-info';
'@
Set-Content -Path "src/config/index.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "feat(config): add barrel exports for config module"

$c = @'
export const SHORTCUT_HELP = [
  { keys: ['Ctrl', 'Enter'], action: 'Generate diagrams' },
  { keys: ['Ctrl', 'Shift', 'C'], action: 'Copy code' },
  { keys: ['Ctrl', 'Shift', 'P'], action: 'Export PNG' },
  { keys: ['Ctrl', 'Shift', 'S'], action: 'Export SVG' },
  { keys: ['Esc'], action: 'Close / Exit fullscreen' },
];
export const formatShortcut = (keys: string[]) => keys.join(' + ');
'@
Set-Content -Path "src/constants/shortcuts-help.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "feat(constants): add keyboard shortcut help data"

$pkg = Get-Content "package.json" -Raw
$pkg = $pkg -replace '"version": "1.0.0"', '"version": "1.1.0"'
Set-Content -Path "package.json" -Value $pkg -Encoding UTF8
git add -A; git commit -m "chore: bump version to 1.1.0 with new modules and features"

git checkout main
git merge --no-ff feature/final-polish -m "merge: final polish - PWA, feature flags, bootstrap, shortcuts (#9)"
git branch -d feature/final-polish

Write-Host "Phase 9 done!" -ForegroundColor Green
Write-Host "ALL PHASES COMPLETE!" -ForegroundColor Cyan
