import { describe, it, expect, vi } from 'vitest';
import { TabController } from '../../components/tabs.component';
describe('TabController', () => {
  const tabs = [
    { type: 'usecase', label: 'Use Case', icon: 'U' },
    { type: 'activity', label: 'Activity', icon: 'A' },
    { type: 'sequence', label: 'Sequence', icon: 'S' },
  ];
  it('initializes with default tab', () => {
    const ctrl = new TabController(tabs, 'usecase', vi.fn());
    expect(ctrl.getActiveTab()).toBe('usecase');
  });
  it('navigates next/prev correctly', () => {
    const ctrl = new TabController(tabs, 'usecase', vi.fn());
    ctrl.nextTab();
    expect(ctrl.getActiveTab()).toBe('activity');
    ctrl.prevTab();
    expect(ctrl.getActiveTab()).toBe('usecase');
  });
});
