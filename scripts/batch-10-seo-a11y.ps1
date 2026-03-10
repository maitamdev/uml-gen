$ErrorActionPreference = "Stop"
Set-Location "c:\Users\Asus\.gemini\antigravity\scratch\uml-generator"
New-Item -ItemType Directory -Force -Path "src/a11y" | Out-Null
New-Item -ItemType Directory -Force -Path "src/seo" | Out-Null
New-Item -ItemType Directory -Force -Path "src/analytics" | Out-Null

# ---- Commit 91 ----
$c = @'
User-agent: *
Allow: /
Sitemap: https://uml-generator.vercel.app/sitemap.xml

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /
'@
Set-Content -Path "public/robots.txt" -Value $c -Encoding UTF8
git add -A; git commit -m "seo: add robots.txt with crawl rules and sitemap reference"

# ---- Commit 92 ----
$c = @'
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://uml-generator.vercel.app/</loc>
    <lastmod>2026-03-10</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
'@
Set-Content -Path "public/sitemap.xml" -Value $c -Encoding UTF8
git add -A; git commit -m "seo: add XML sitemap for search engine indexing"

# ---- Commit 93 ----
$c = @'
{
  "name": "UML Generator",
  "short_name": "UML Gen",
  "description": "AI-powered UML diagram generator from natural language descriptions",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#05050f",
  "theme_color": "#6366f1",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/vite.svg",
      "sizes": "any",
      "type": "image/svg+xml"
    }
  ]
}
'@
Set-Content -Path "public/manifest.json" -Value $c -Encoding UTF8
git add -A; git commit -m "feat(pwa): add web app manifest for installable PWA"

# ---- Commit 94 ----
$c = @'
// ARIA Accessibility Utilities
export function setAriaLabel(element: HTMLElement, label: string): void {
  element.setAttribute('aria-label', label);
}

export function setAriaExpanded(element: HTMLElement, expanded: boolean): void {
  element.setAttribute('aria-expanded', String(expanded));
}

export function setAriaHidden(element: HTMLElement, hidden: boolean): void {
  element.setAttribute('aria-hidden', String(hidden));
}

export function setRole(element: HTMLElement, role: string): void {
  element.setAttribute('role', role);
}

export function announceToScreenReader(message: string): void {
  const el = document.createElement('div');
  el.setAttribute('role', 'status');
  el.setAttribute('aria-live', 'polite');
  el.className = 'sr-only';
  el.textContent = message;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1000);
}

export function setAriaControls(trigger: HTMLElement, targetId: string): void {
  trigger.setAttribute('aria-controls', targetId);
}
'@
Set-Content -Path "src/a11y/aria.utils.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "feat(a11y): add ARIA attribute utility functions"

# ---- Commit 95 ----
$c = @'
// Focus Trap - keeps focus within a container
export function createFocusTrap(container: HTMLElement) {
  const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

  function getFocusableElements(): HTMLElement[] {
    return Array.from(container.querySelectorAll<HTMLElement>(focusableSelector))
      .filter(el => !el.hasAttribute('disabled'));
  }

  function handleKeyDown(e: KeyboardEvent): void {
    if (e.key !== 'Tab') return;
    const focusable = getFocusableElements();
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function activate(): void {
    container.addEventListener('keydown', handleKeyDown);
    const focusable = getFocusableElements();
    if (focusable.length > 0) focusable[0].focus();
  }

  function deactivate(): void {
    container.removeEventListener('keydown', handleKeyDown);
  }

  return { activate, deactivate };
}
'@
Set-Content -Path "src/a11y/focus-trap.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "feat(a11y): add focus trap for modal accessibility"

# ---- Commit 96 ----
$c = @'
// Screen Reader Utilities
export function createLiveRegion(type: 'polite' | 'assertive' = 'polite'): HTMLElement {
  const region = document.createElement('div');
  region.setAttribute('role', 'status');
  region.setAttribute('aria-live', type);
  region.setAttribute('aria-atomic', 'true');
  region.className = 'sr-only';
  document.body.appendChild(region);
  return region;
}

export function announce(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
  const region = createLiveRegion(priority);
  setTimeout(() => { region.textContent = message; }, 100);
  setTimeout(() => region.remove(), 2000);
}

export function announceLoadingStart(action: string): void {
  announce('Dang ' + action + '...', 'polite');
}

export function announceLoadingEnd(action: string): void {
  announce(action + ' hoan tat', 'polite');
}

export function announceError(message: string): void {
  announce('Loi: ' + message, 'assertive');
}
'@
Set-Content -Path "src/a11y/screen-reader.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "feat(a11y): add screen reader announcement utilities"

# ---- Commit 97 ----
$c = @'
// Dynamic Meta Tags Manager
export function updateMetaTag(name: string, content: string): void {
  let meta = document.querySelector<HTMLMetaElement>('meta[name="' + name + '"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = name;
    document.head.appendChild(meta);
  }
  meta.content = content;
}

export function updateTitle(title: string): void {
  document.title = title + ' | UML Generator';
}

export function updateOpenGraph(data: { title: string; description: string; url?: string }): void {
  updateMetaTag('og:title', data.title);
  updateMetaTag('og:description', data.description);
  if (data.url) updateMetaTag('og:url', data.url);
  updateMetaTag('og:type', 'website');
}

export function setCanonicalUrl(url: string): void {
  let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = url;
}
'@
Set-Content -Path "src/seo/meta-tags.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "feat(seo): add dynamic meta tag and Open Graph manager"

# ---- Commit 98 ----
$c = @'
// JSON-LD Structured Data
export function injectStructuredData(): void {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'UML Diagram Generator',
    description: 'AI-powered UML diagram generator from natural language descriptions in Vietnamese',
    url: 'https://uml-generator.vercel.app',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Person',
      name: 'MaiTamDev',
      url: 'https://github.com/maitamdev',
    },
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}
'@
Set-Content -Path "src/seo/structured-data.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "feat(seo): add JSON-LD structured data for rich search results"

# ---- Commit 99 ----
$c = @'
// Analytics Event Tracker
type EventCategory = 'diagram' | 'export' | 'ui' | 'api' | 'error';

interface AnalyticsEvent {
  category: EventCategory;
  action: string;
  label?: string;
  value?: number;
  timestamp: number;
}

const eventLog: AnalyticsEvent[] = [];

export function trackEvent(category: EventCategory, action: string, label?: string, value?: number): void {
  const event: AnalyticsEvent = { category, action, label, value, timestamp: Date.now() };
  eventLog.push(event);
  if (eventLog.length > 1000) eventLog.splice(0, 500);
}

export function trackDiagramGenerated(type: string, duration: number): void {
  trackEvent('diagram', 'generate', type, duration);
}

export function trackExport(format: string): void {
  trackEvent('export', 'download', format);
}

export function trackError(code: string, message: string): void {
  trackEvent('error', code, message);
}

export function getEventLog(): AnalyticsEvent[] {
  return [...eventLog];
}

export function clearEventLog(): void {
  eventLog.length = 0;
}
'@
Set-Content -Path "src/analytics/event-tracker.ts" -Value $c -Encoding UTF8
git add -A; git commit -m "feat(analytics): add client-side event tracking system"

# ---- Commit 100 ----
# Update package.json version
$pkg = Get-Content "package.json" -Raw
$pkg = $pkg -replace '"version": "0.0.0"', '"version": "1.0.0"'
Set-Content -Path "package.json" -Value $pkg -Encoding UTF8
git add -A; git commit -m "chore: bump version to 1.0.0 for initial stable release"

Write-Host "Batch 10 done: 10 commits (SEO/A11y/Polish)" -ForegroundColor Green
Write-Host "ALL 100 COMMITS COMPLETED!" -ForegroundColor Cyan
