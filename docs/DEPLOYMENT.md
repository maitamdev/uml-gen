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
