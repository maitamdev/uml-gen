// Date utility tests
import { describe, it, expect } from 'vitest';
import { formatDuration } from '../../utils/date.utils';

describe('formatDuration', () => {
  it('formats milliseconds', () => { expect(formatDuration(500)).toBe('500ms'); });
  it('formats seconds', () => { expect(formatDuration(2500)).toBe('2.5s'); });
  it('formats exact second', () => { expect(formatDuration(1000)).toBe('1.0s'); });
});
