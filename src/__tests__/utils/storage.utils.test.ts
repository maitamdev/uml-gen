// Storage utility tests
import { describe, it, expect, beforeEach } from 'vitest';
import { getItem, setItem, removeItem, clearAll } from '../../utils/storage.utils';

describe('storage utils', () => {
  beforeEach(() => { localStorage.clear(); });

  it('stores and retrieves values', () => {
    setItem('test-key', 'hello');
    expect(getItem('test-key', '')).toBe('hello');
  });

  it('returns fallback for missing keys', () => {
    expect(getItem('missing', 'default')).toBe('default');
  });

  it('stores complex objects', () => {
    setItem('obj', { a: 1, b: 'test' });
    expect(getItem('obj', null)).toEqual({ a: 1, b: 'test' });
  });

  it('removes items', () => {
    setItem('to-remove', 'value');
    removeItem('to-remove');
    expect(getItem('to-remove', null)).toBeNull();
  });

  it('clears all prefixed items', () => {
    setItem('key1', 'a');
    setItem('key2', 'b');
    clearAll();
    expect(getItem('key1', null)).toBeNull();
    expect(getItem('key2', null)).toBeNull();
  });
});
