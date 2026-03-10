// Error utility tests
import { describe, it, expect } from 'vitest';
import { getErrorMessage, isNetworkError, isRateLimitError, createAppError, formatApiError } from '../../utils/error.utils';

describe('getErrorMessage', () => {
  it('extracts message from Error', () => { expect(getErrorMessage(new Error('test'))).toBe('test'); });
  it('returns string directly', () => { expect(getErrorMessage('error')).toBe('error'); });
  it('returns default for unknown types', () => { expect(getErrorMessage(42)).toBe('An unknown error occurred'); });
});

describe('isRateLimitError', () => {
  it('detects 429 as rate limit', () => { expect(isRateLimitError(429)).toBe(true); });
  it('detects 402 as rate limit', () => { expect(isRateLimitError(402)).toBe(true); });
  it('rejects other status codes', () => { expect(isRateLimitError(200)).toBe(false); });
});

describe('createAppError', () => {
  it('creates structured error', () => {
    const err = createAppError('test error', 'ERR_TEST');
    expect(err.message).toBe('test error');
    expect(err.code).toBe('ERR_TEST');
    expect(err.recoverable).toBe(true);
  });
});

describe('formatApiError', () => {
  it('formats 401 error', () => { expect(formatApiError(401, 'Groq')).toContain('invalid'); });
  it('formats 429 error', () => { expect(formatApiError(429, 'HF')).toContain('Rate limit'); });
  it('formats 500 error', () => { expect(formatApiError(500, 'HF')).toContain('Server error'); });
});
