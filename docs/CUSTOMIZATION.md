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
