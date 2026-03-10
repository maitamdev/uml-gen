// Validation utility tests
import { describe, it, expect } from 'vitest';
import { isNonEmpty, isValidApiKey, isValidUrl, clamp, isWithinRange, sanitizeInput } from '../../utils/validation.utils';

describe('isNonEmpty', () => {
  it('returns true for non-empty string', () => { expect(isNonEmpty('hello')).toBe(true); });
  it('returns false for empty string', () => { expect(isNonEmpty('')).toBe(false); });
  it('returns false for whitespace only', () => { expect(isNonEmpty('   ')).toBe(false); });
});

describe('isValidApiKey', () => {
  it('validates Hugging Face keys', () => { expect(isValidApiKey('hf_abcdefghijklm', 'huggingface')).toBe(true); });
  it('rejects invalid HF keys', () => { expect(isValidApiKey('invalid', 'huggingface')).toBe(false); });
  it('validates Groq keys', () => { expect(isValidApiKey('gsk_abcdefghijklm', 'groq')).toBe(true); });
});

describe('isValidUrl', () => {
  it('validates URLs', () => { expect(isValidUrl('https://example.com')).toBe(true); });
  it('rejects invalid URLs', () => { expect(isValidUrl('not-a-url')).toBe(false); });
});

describe('clamp', () => {
  it('clamps value within range', () => { expect(clamp(150, 0, 100)).toBe(100); });
  it('returns value if within range', () => { expect(clamp(50, 0, 100)).toBe(50); });
  it('clamps to minimum', () => { expect(clamp(-5, 0, 100)).toBe(0); });
});

describe('isWithinRange', () => {
  it('returns true if within range', () => { expect(isWithinRange(50, 0, 100)).toBe(true); });
  it('returns false if out of range', () => { expect(isWithinRange(150, 0, 100)).toBe(false); });
});

describe('sanitizeInput', () => {
  it('strips HTML tags', () => { expect(sanitizeInput('<script>alert(1)</script>test')).toBe('alert(1)test'); });
});
