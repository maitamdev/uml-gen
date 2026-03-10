// String utility tests
import { describe, it, expect } from 'vitest';
import { truncate, sanitizeHtml, slugify, capitalize, countWords, removeExtraSpaces } from '../../utils/string.utils';

describe('truncate', () => {
  it('returns original string if within limit', () => { expect(truncate('hello', 10)).toBe('hello'); });
  it('truncates long strings with suffix', () => { expect(truncate('hello world', 8)).toBe('hello...'); });
  it('uses custom suffix', () => { expect(truncate('hello world', 8, '~')).toBe('hello w~'); });
});

describe('sanitizeHtml', () => {
  it('escapes HTML entities', () => { expect(sanitizeHtml('<b>test</b>')).toBe('&lt;b&gt;test&lt;/b&gt;'); });
  it('escapes quotes', () => { expect(sanitizeHtml('"hello"')).toBe('&quot;hello&quot;'); });
});

describe('slugify', () => {
  it('creates a URL-safe slug', () => { expect(slugify('Hello World')).toBe('hello-world'); });
  it('removes special characters', () => { expect(slugify('Test! @#$')).toBe('test'); });
});

describe('capitalize', () => {
  it('capitalizes first letter', () => { expect(capitalize('hello')).toBe('Hello'); });
});

describe('countWords', () => {
  it('counts words in a string', () => { expect(countWords('hello world test')).toBe(3); });
  it('handles empty string', () => { expect(countWords('')).toBe(0); });
});

describe('removeExtraSpaces', () => {
  it('collapses multiple spaces', () => { expect(removeExtraSpaces('hello   world')).toBe('hello world'); });
});
