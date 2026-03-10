# Migration Guide

## From v0.x to v1.0

### Breaking Changes
- API key storage format changed (keys are now stored per-provider)
- DiagramSet type now includes optional fields

### New Features
- Dual AI provider support with auto-failover
- i18n internationalization system
- State management with reactive store
- Middleware pipeline for API requests
- Security hardening (CSP, XSS protection)

### Migration Steps
1. Clear localStorage (`localStorage.clear()`)
2. Re-enter your API key in the settings panel
3. No code changes needed for template usage
