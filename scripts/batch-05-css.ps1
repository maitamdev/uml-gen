$ErrorActionPreference = "Stop"
Set-Location "c:\Users\Asus\.gemini\antigravity\scratch\uml-generator"
New-Item -ItemType Directory -Force -Path "src/styles/tokens" | Out-Null
New-Item -ItemType Directory -Force -Path "src/styles/utilities" | Out-Null

# ---- Commit 41 ----
$c = @'
/* Color Design Tokens - Extended Palette */
:root {
  --color-indigo-50: #eef2ff;
  --color-indigo-100: #e0e7ff;
  --color-indigo-200: #c7d2fe;
  --color-indigo-300: #a5b4fc;
  --color-indigo-400: #818cf8;
  --color-indigo-500: #6366f1;
  --color-indigo-600: #4f46e5;
  --color-indigo-700: #4338ca;
  --color-indigo-800: #3730a3;
  --color-indigo-900: #312e81;

  --color-violet-400: #a78bfa;
  --color-violet-500: #8b5cf6;
  --color-violet-600: #7c3aed;

  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #6366f1;
}
'@
Set-Content -Path "src/styles/tokens/colors.css" -Value $c -Encoding UTF8
git add -A; git commit -m "style(tokens): add extended color palette design tokens"

# ---- Commit 42 ----
$c = @'
/* Typography Design Tokens */
:root {
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', 'Cascadia Code', 'Fira Code', monospace;

  --text-xs: 0.65rem;
  --text-sm: 0.75rem;
  --text-base: 0.875rem;
  --text-md: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 2rem;
  --text-4xl: 2.5rem;
  --text-5xl: 3.2rem;

  --font-light: 300;
  --font-regular: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  --font-extrabold: 800;

  --leading-tight: 1.2;
  --leading-snug: 1.4;
  --leading-normal: 1.6;
  --leading-relaxed: 1.8;

  --tracking-tight: -0.02em;
  --tracking-normal: 0;
  --tracking-wide: 0.05em;
  --tracking-wider: 0.08em;
}
'@
Set-Content -Path "src/styles/tokens/typography.css" -Value $c -Encoding UTF8
git add -A; git commit -m "style(tokens): add typography scale and font weight tokens"

# ---- Commit 43 ----
$c = @'
/* Spacing Design Tokens */
:root {
  --space-0: 0;
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;

  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
  --container-2xl: 1400px;
}
'@
Set-Content -Path "src/styles/tokens/spacing.css" -Value $c -Encoding UTF8
git add -A; git commit -m "style(tokens): add spacing scale and container size tokens"

# ---- Commit 44 ----
$c = @'
/* Shadow Design Tokens */
:root {
  --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.2);
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.5);
  --shadow-xl: 0 20px 60px rgba(0, 0, 0, 0.6);
  --shadow-2xl: 0 25px 80px rgba(0, 0, 0, 0.7);

  --shadow-glow-sm: 0 0 15px rgba(99, 102, 241, 0.15);
  --shadow-glow-md: 0 0 30px rgba(99, 102, 241, 0.2);
  --shadow-glow-lg: 0 4px 40px rgba(99, 102, 241, 0.25);
  --shadow-glow-brand: 0 0 60px rgba(99, 102, 241, 0.15), 0 0 120px rgba(139, 92, 246, 0.08);

  --shadow-inset: inset 0 2px 4px rgba(0, 0, 0, 0.3);
}
'@
Set-Content -Path "src/styles/tokens/shadows.css" -Value $c -Encoding UTF8
git add -A; git commit -m "style(tokens): add shadow and glow effect design tokens"

# ---- Commit 45 ----
$c = @'
/* Animation Keyframes Library */
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fade-in-down {
  from { opacity: 0; transform: translateY(-12px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slide-in-right {
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes scale-in {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
'@
Set-Content -Path "src/styles/tokens/animations.css" -Value $c -Encoding UTF8
git add -A; git commit -m "style(tokens): add animation keyframes library"

# ---- Commit 46 ----
$c = @'
/* Border Design Tokens */
:root {
  --border-width-thin: 1px;
  --border-width-default: 1.5px;
  --border-width-thick: 2px;

  --border-subtle: rgba(99, 102, 241, 0.1);
  --border-default: rgba(99, 102, 241, 0.18);
  --border-hover: rgba(139, 92, 246, 0.35);
  --border-active: rgba(99, 102, 241, 0.5);
  --border-focus: rgba(99, 102, 241, 0.6);

  --radius-xs: 6px;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  --radius-2xl: 24px;
  --radius-full: 9999px;
}
'@
Set-Content -Path "src/styles/tokens/borders.css" -Value $c -Encoding UTF8
git add -A; git commit -m "style(tokens): add border width, color, and radius tokens"

# ---- Commit 47 ----
$c = @'
/* Responsive Breakpoint Tokens */
:root {
  --bp-sm: 640px;
  --bp-md: 768px;
  --bp-lg: 1024px;
  --bp-xl: 1280px;
  --bp-2xl: 1536px;
}

/* Media query custom properties fallback */
/* Usage: @media (max-width: 768px) { ... } */
/* These serve as documentation for the breakpoint system */
'@
Set-Content -Path "src/styles/tokens/breakpoints.css" -Value $c -Encoding UTF8
git add -A; git commit -m "style(tokens): add responsive breakpoint tokens"

# ---- Commit 48 ----
$c = @'
/* Flexbox Utility Classes */
.flex { display: flex; }
.flex-col { flex-direction: column; }
.flex-row { flex-direction: row; }
.flex-wrap { flex-wrap: wrap; }
.flex-1 { flex: 1; }
.flex-shrink-0 { flex-shrink: 0; }

.items-center { align-items: center; }
.items-start { align-items: flex-start; }
.items-end { align-items: flex-end; }
.items-stretch { align-items: stretch; }

.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }
.justify-end { justify-content: flex-end; }
.justify-start { justify-content: flex-start; }

.gap-1 { gap: 0.25rem; }
.gap-2 { gap: 0.5rem; }
.gap-3 { gap: 0.75rem; }
.gap-4 { gap: 1rem; }
.gap-6 { gap: 1.5rem; }
.gap-8 { gap: 2rem; }

.self-center { align-self: center; }
.self-end { align-self: flex-end; }
'@
Set-Content -Path "src/styles/utilities/flex.css" -Value $c -Encoding UTF8
git add -A; git commit -m "style(utilities): add flexbox utility classes"

# ---- Commit 49 ----
$c = @'
/* Text Utility Classes */
.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }

.text-xs { font-size: 0.65rem; }
.text-sm { font-size: 0.75rem; }
.text-base { font-size: 0.875rem; }
.text-lg { font-size: 1.125rem; }
.text-xl { font-size: 1.25rem; }

.font-medium { font-weight: 500; }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }

.text-primary { color: var(--text-primary); }
.text-secondary { color: var(--text-secondary); }
.text-muted { color: var(--text-muted); }
.text-brand { color: var(--indigo); }

.truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.uppercase { text-transform: uppercase; letter-spacing: 0.05em; }
.capitalize { text-transform: capitalize; }
'@
Set-Content -Path "src/styles/utilities/text.css" -Value $c -Encoding UTF8
git add -A; git commit -m "style(utilities): add text and typography utility classes"

# ---- Commit 50 ----
$c = @'
/* Visibility Utility Classes */
.hidden { display: none !important; }
.visible { visibility: visible; }
.invisible { visibility: hidden; }

.opacity-0 { opacity: 0; }
.opacity-50 { opacity: 0.5; }
.opacity-100 { opacity: 1; }

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.pointer-events-none { pointer-events: none; }
.pointer-events-auto { pointer-events: auto; }
.cursor-pointer { cursor: pointer; }
.select-none { user-select: none; }

@media (max-width: 768px) {
  .md-hidden { display: none !important; }
}
@media (min-width: 769px) {
  .md-visible { display: block; }
}
'@
Set-Content -Path "src/styles/utilities/visibility.css" -Value $c -Encoding UTF8
git add -A; git commit -m "style(utilities): add visibility, opacity, and responsive display utilities"

Write-Host "Batch 5 done: 10 commits (CSS tokens/utilities)" -ForegroundColor Green
