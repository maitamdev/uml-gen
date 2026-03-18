import { ZOOM_CONFIG } from './constants';
export class ZoomController {
  private level: number = ZOOM_CONFIG.DEFAULT;
  private container: HTMLElement | null = null;
  constructor(private onChange?: (level: number) => void) {}
  attach(container: HTMLElement): void { this.container = container; this.apply(); }
  zoomIn(): void { this.setLevel(this.level + ZOOM_CONFIG.STEP); }
  zoomOut(): void { this.setLevel(this.level - ZOOM_CONFIG.STEP); }
  reset(): void { this.setLevel(ZOOM_CONFIG.DEFAULT); }
  setLevel(level: number): void {
    this.level = Math.max(ZOOM_CONFIG.MIN, Math.min(ZOOM_CONFIG.MAX, level));
    this.apply();
    this.onChange?.(this.level);
  }
  getLevel(): number { return this.level; }
  getPercentage(): number { return Math.round(this.level * 100); }
  private apply(): void {
    if (this.container) this.container.style.transform = 'scale(' + this.level + ')';
  }
}
