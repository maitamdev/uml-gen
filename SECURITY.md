# Security Policy

## Supported Versions
| Version | Supported |
|---------|-----------|
| 1.1.x   | Yes       |
| 1.0.x   | Yes       |
| < 1.0   | No        |

## Reporting a Vulnerability
If you discover a security vulnerability, please report it by emailing security@maitamdev.com.

Do NOT create a public GitHub issue for security vulnerabilities.

## Security Measures
- API keys stored client-side only in localStorage
- Content Security Policy headers enforced
- XSS protection via HTML sanitization
- Rate limiting on API calls
- No server-side code or data storage
