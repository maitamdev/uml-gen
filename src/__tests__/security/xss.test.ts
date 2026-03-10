import { describe, it, expect } from 'vitest';
import { escapeHtml, sanitizeUrl, stripScriptTags } from '../../security/xss';
describe('XSS Protection', () => {
  it('escapes HTML', () => { expect(escapeHtml('<b>hi</b>')).toContain('&lt;'); });
  it('blocks javascript: URLs', () => { expect(sanitizeUrl('javascript:alert(1)')).toBe(''); });
  it('allows https URLs', () => { expect(sanitizeUrl('https://x.com')).toBeTruthy(); });
  it('strips script tags', () => { expect(stripScriptTags('a<script>x</script>b')).toBe('ab'); });
});
