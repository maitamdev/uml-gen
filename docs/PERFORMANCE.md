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
