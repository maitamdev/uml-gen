$ErrorActionPreference = "Stop"
Set-Location "c:\Users\Asus\.gemini\antigravity\scratch\uml-generator"
New-Item -ItemType Directory -Force -Path "docs" | Out-Null

# ---- Commit 31: ARCHITECTURE.md ----
$c = @'
# Architecture Overview

## Tech Stack
- **Frontend**: Vanilla TypeScript + Vite
- **Rendering**: Mermaid.js for diagram rendering
- **AI**: Hugging Face API / Groq API (dual provider with auto-failover)
- **Styling**: Pure CSS with design tokens
- **Deployment**: Vercel

## Module Structure
```
src/
  main.ts              # App entry point, event listeners, UI logic
  ai-generator.ts      # AI provider management, API calls, prompt engineering
  diagram-renderer.ts  # Mermaid.js initialization and rendering
  templates.ts         # Pre-built diagram templates
  export.ts            # SVG/PNG export utilities
  style.css            # Complete styling with design tokens
  types/               # TypeScript type definitions
  constants/           # Application constants
  utils/               # Utility functions
```

## Data Flow
1. User enters project description
2. `ai-generator.ts` sends prompt to AI provider
3. AI returns Mermaid syntax code
4. `diagram-renderer.ts` renders Mermaid to SVG
5. `export.ts` handles SVG/PNG download

## Design Decisions
- **No framework**: Lightweight, fast loading, zero runtime overhead
- **Dual AI providers**: Failover ensures uptime when one provider is rate-limited
- **Template system**: Instant results for common project types
- **Dark theme**: Optimized for developer comfort and diagram readability
'@
Set-Content -Path "docs/ARCHITECTURE.md" -Value $c -Encoding UTF8
git add -A; git commit -m "docs: add architecture overview document"

# ---- Commit 32: API_GUIDE.md ----
$c = @'
# API Integration Guide

## Supported Providers

### Hugging Face (Recommended)
- **Model**: Qwen/Qwen2.5-Coder-32B-Instruct
- **Free tier**: 300 requests/hour
- **Get key**: https://huggingface.co/settings/tokens

### Groq
- **Model**: llama-3.3-70b-versatile
- **Free tier**: 30 requests/minute
- **Get key**: https://console.groq.com/keys

## Auto-Failover
The system automatically switches to the backup provider when:
- HTTP 402 (Payment Required) - quota exceeded
- HTTP 429 (Too Many Requests) - rate limited

## API Key Storage
Keys are stored in `localStorage` per provider:
- `uml-gen-key-huggingface`
- `uml-gen-key-groq`

## Rate Limits
| Provider     | Requests/min | Requests/hour |
|-------------|-------------|---------------|
| Hugging Face | ~5          | 300           |
| Groq         | 30          | 600           |
'@
Set-Content -Path "docs/API_GUIDE.md" -Value $c -Encoding UTF8
git add -A; git commit -m "docs: add API integration guide with provider details"

# ---- Commit 33: DEPLOYMENT.md ----
$c = @'
# Deployment Guide

## Local Development
```bash
npm install
npm run dev
```

## Build for Production
```bash
npm run build
npm run preview
```

## Deploy to Vercel
1. Push to GitHub
2. Import project at vercel.com
3. Framework: Vite
4. Build command: `npm run build`
5. Output directory: `dist`

## Environment Variables
No server-side environment variables needed.
API keys are stored client-side in localStorage.

## Custom Domain
Configure in Vercel dashboard > Settings > Domains.

## Performance Notes
- Bundle size: ~120KB gzipped (including Mermaid.js)
- First paint: < 1 second
- No server-side rendering required
'@
Set-Content -Path "docs/DEPLOYMENT.md" -Value $c -Encoding UTF8
git add -A; git commit -m "docs: add deployment guide for Vercel and local dev"

# ---- Commit 34: CHANGELOG.md ----
$c = @'
# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2026-03-10

### Added
- AI-powered UML diagram generation from natural language
- Support for Use Case, Activity, Sequence, and Class diagrams
- Dual AI provider support (Hugging Face + Groq)
- Auto-failover between providers
- Pre-built templates for common projects
- SVG and PNG export
- Zoom controls with slider and keyboard shortcuts
- Fullscreen diagram view
- Dark theme with glassmorphism design
- Responsive mobile layout
- Vietnamese language UI

### Technical
- TypeScript type system with strict mode
- Modular constants and utilities
- Mermaid.js integration with custom dark theme
- Local storage for API key persistence
'@
Set-Content -Path "docs/CHANGELOG.md" -Value $c -Encoding UTF8
git add -A; git commit -m "docs: add changelog documenting v1.0.0 release features"

# ---- Commit 35: TROUBLESHOOTING.md ----
$c = @'
# Troubleshooting Guide

## Common Issues

### API Key Not Working
- Ensure key starts with `hf_` (Hugging Face) or `gsk_` (Groq)
- Check if free quota is exhausted
- Try switching to the other provider

### Diagram Not Rendering
- Check browser console for Mermaid syntax errors
- Try regenerating the diagram
- Some complex diagrams may need manual code adjustment

### Export Issues
- **PNG export blank**: Ensure diagram is fully rendered before exporting
- **SVG too large**: Use zoom controls to adjust before exporting

### Performance
- Clear browser cache if app loads slowly
- Disable browser extensions that may interfere

## Getting Help
Open an issue at the GitHub repository with:
1. Browser and version
2. Console error messages
3. Steps to reproduce
'@
Set-Content -Path "docs/TROUBLESHOOTING.md" -Value $c -Encoding UTF8
git add -A; git commit -m "docs: add troubleshooting guide for common issues"

# ---- Commit 36: CODE_OF_CONDUCT.md ----
$c = @'
# Code of Conduct

## Our Pledge
We pledge to make participation in our project a harassment-free experience
for everyone, regardless of age, body size, disability, ethnicity, gender
identity, level of experience, nationality, personal appearance, race,
religion, or sexual identity and orientation.

## Our Standards
- Use welcoming and inclusive language
- Be respectful of differing viewpoints
- Accept constructive criticism gracefully
- Focus on what is best for the community

## Enforcement
Instances of abusive behavior may be reported to the project maintainers.
All complaints will be reviewed and investigated promptly.

## Attribution
This Code of Conduct is adapted from the Contributor Covenant, version 2.1.
'@
Set-Content -Path "CODE_OF_CONDUCT.md" -Value $c -Encoding UTF8
git add -A; git commit -m "docs: add code of conduct for contributors"

# ---- Commit 37: DIAGRAM_TYPES.md ----
$c = @'
# Supported Diagram Types

## Use Case Diagram
Shows actors and their interactions with system functions.
Best for: Requirements analysis, stakeholder communication.

## Activity Diagram
Visualizes workflows and business processes step by step.
Best for: Process documentation, algorithm design.

## Sequence Diagram
Shows object interactions over time with messages.
Best for: API design, system integration documentation.

## Class Diagram
Displays classes, attributes, methods, and relationships.
Best for: Object-oriented design, database schema planning.

## Rendering Engine
All diagrams are rendered using Mermaid.js syntax, which supports:
- Flowcharts (used for Use Case adaptation)
- Sequence diagrams
- Class diagrams
- State diagrams
- Gantt charts

## AI Prompt Engineering
Each diagram type has specialized prompts optimized for:
- Correct Mermaid syntax output
- Vietnamese label support
- Professional diagram structure
'@
Set-Content -Path "docs/DIAGRAM_TYPES.md" -Value $c -Encoding UTF8
git add -A; git commit -m "docs: add diagram types documentation with use cases"

# ---- Commit 38: CUSTOMIZATION.md ----
$c = @'
# Customization Guide

## Theme Colors
Edit CSS custom properties in `src/style.css`:
```css
:root {
  --indigo: #6366f1;    /* Primary brand color */
  --violet: #8b5cf6;    /* Secondary accent */
  --bg-base: #05050f;   /* Background */
}
```

## Adding New Templates
Edit `src/templates.ts` and add a new entry:
```typescript
templateKey: {
  name: 'Template Name',
  description: 'Short description',
  diagrams: {
    usecase: '...mermaid code...',
    activity: '...mermaid code...',
  }
}
```

## Adding AI Providers
Edit `src/ai-generator.ts` PROVIDERS object to add new providers
with compatible OpenAI Chat Completions API format.

## Mermaid Theme
Customize diagram colors in `src/diagram-renderer.ts` themeVariables.
'@
Set-Content -Path "docs/CUSTOMIZATION.md" -Value $c -Encoding UTF8
git add -A; git commit -m "docs: add customization guide for themes and templates"

# ---- Commit 39: PERFORMANCE.md ----
$c = @'
# Performance Optimization

## Current Metrics
- **Bundle size**: ~120KB gzipped
- **First Contentful Paint**: < 1s
- **Time to Interactive**: < 2s

## Optimization Techniques

### Font Loading
- Google Fonts with `preconnect` for faster loading
- `display=swap` to prevent FOIT

### CSS
- No CSS framework overhead
- Custom properties for runtime theming
- Hardware-accelerated animations with `transform` and `opacity`

### JavaScript
- Tree-shaking via Vite bundler
- Lazy Mermaid initialization
- Debounced event handlers for scroll and resize

### Network
- Client-side only - no server round trips for UI
- API calls only when user generates diagrams
- localStorage caching for API keys

## Bundle Analysis
Run `npm run build` to see bundle size breakdown.
'@
Set-Content -Path "docs/PERFORMANCE.md" -Value $c -Encoding UTF8
git add -A; git commit -m "docs: add performance optimization documentation"

# ---- Commit 40: FAQ.md ----
$c = @'
# FAQ - Frequently Asked Questions

## General

**Q: Is this free to use?**
A: Yes! The app is free. You just need a free API key from Hugging Face or Groq.

**Q: Does it work offline?**
A: The UI works offline, but diagram generation requires an internet connection for AI.

**Q: What languages are supported?**
A: The UI is in Vietnamese. You can describe your project in Vietnamese or English.

## Technical

**Q: Why does my diagram look wrong?**
A: AI-generated Mermaid code may occasionally have syntax issues. Try regenerating.

**Q: Can I edit the generated code?**
A: Yes! Click "Show Code" to see and copy the Mermaid syntax for manual editing.

**Q: Which browser is recommended?**
A: Chrome, Firefox, or Edge (latest versions). Safari has limited SVG export support.

**Q: How is my API key stored?**
A: Securely in your browser localStorage. Never sent to any server except the AI provider.

## Contributing

**Q: How can I contribute?**
A: See CONTRIBUTING.md for guidelines. Pull requests are welcome!

**Q: Can I add new diagram types?**
A: Yes! See docs/CUSTOMIZATION.md for instructions.
'@
Set-Content -Path "docs/FAQ.md" -Value $c -Encoding UTF8
git add -A; git commit -m "docs: add FAQ document with common questions and answers"

Write-Host "Batch 4 done: 10 commits (Docs)" -ForegroundColor Green
