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
