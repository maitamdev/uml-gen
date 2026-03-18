# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| 1.2.x   | âœ…        |
| < 1.0   | âŒ        |

## Reporting a Vulnerability

If you discover a security vulnerability:

1. **Do NOT** open a public issue
2. Email security concerns to the maintainer
3. Include steps to reproduce
4. Allow 48 hours for initial response

## API Key Security

- API keys are stored in localStorage (client-side only)
- Keys are never sent to our servers
- Keys are only sent to the selected AI provider (Hugging Face/Groq)
- We recommend using read-only tokens with minimal permissions
