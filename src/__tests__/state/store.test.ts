import { describe, it, expect, vi } from 'vitest';
import { Store } from '../../state/store';
describe('Store', () => {
  it('manages state with partial updates', () => {
    const store = new Store({ a: 1, b: 2 });
    store.setState({ a: 10 });
    expect(store.getState()).toEqual({ a: 10, b: 2 });
  });
  it('notifies subscribers', () => {
    const store = new Store({ x: 0 });
    const fn = vi.fn();
    store.subscribe(fn);
    store.setState({ x: 5 });
    expect(fn).toHaveBeenCalledWith({ x: 5 });
  });
  it('supports unsubscribe', () => {
    const store = new Store({ x: 0 });
    const fn = vi.fn();
    const unsub = store.subscribe(fn);
    unsub();
    store.setState({ x: 5 });
    expect(fn).not.toHaveBeenCalled();
  });
});
