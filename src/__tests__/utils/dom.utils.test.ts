// DOM utility tests
import { describe, it, expect, beforeEach } from 'vitest';
import { createElement, toggleClass, isVisible } from '../../utils/dom.utils';

describe('createElement', () => {
  it('creates element with tag', () => {
    const el = createElement('div');
    expect(el.tagName).toBe('DIV');
  });

  it('sets attributes', () => {
    const el = createElement('input', { type: 'text', id: 'test-input' });
    expect(el.getAttribute('type')).toBe('text');
    expect(el.id).toBe('test-input');
  });

  it('adds text children', () => {
    const el = createElement('p', {}, ['Hello']);
    expect(el.textContent).toBe('Hello');
  });
});

describe('toggleClass', () => {
  it('toggles class on element', () => {
    const el = document.createElement('div');
    toggleClass(el, 'active');
    expect(el.classList.contains('active')).toBe(true);
    toggleClass(el, 'active');
    expect(el.classList.contains('active')).toBe(false);
  });

  it('forces class state', () => {
    const el = document.createElement('div');
    toggleClass(el, 'active', true);
    expect(el.classList.contains('active')).toBe(true);
  });
});
