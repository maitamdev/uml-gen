import { describe, it, expect } from 'vitest';
import { RateLimiter } from '../../security/rate-limiter';
describe('RateLimiter', () => {
  it('allows within limit', () => {
    const rl = new RateLimiter(3, 60000);
    expect(rl.canMakeRequest()).toBe(true);
    expect(rl.getRemaining()).toBe(3);
  });
  it('blocks after exceeding limit', () => {
    const rl = new RateLimiter(2, 60000);
    rl.recordRequest(); rl.recordRequest();
    expect(rl.canMakeRequest()).toBe(false);
    expect(rl.getRemaining()).toBe(0);
  });
});
