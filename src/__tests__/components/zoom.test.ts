import { describe, it, expect, vi } from 'vitest';
import { ZoomController } from '../../components/zoom-controls.component';
describe('ZoomController', () => {
  const config = { min: 25, max: 200, step: 25, default: 100 };
  it('zooms in/out correctly', () => {
    const ctrl = new ZoomController(config, vi.fn());
    ctrl.zoomIn();
    expect(ctrl.getLevel()).toBe(125);
    ctrl.zoomOut();
    expect(ctrl.getLevel()).toBe(100);
  });
  it('clamps to range', () => {
    const ctrl = new ZoomController(config, vi.fn());
    ctrl.setLevel(999);
    expect(ctrl.getLevel()).toBe(200);
  });
  it('resets to 100', () => {
    const ctrl = new ZoomController(config, vi.fn());
    ctrl.zoomIn(); ctrl.reset();
    expect(ctrl.getLevel()).toBe(100);
  });
});
