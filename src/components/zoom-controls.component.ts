// Zoom Controls Component
export class ZoomController {
  private level: number;
  private min: number;
  private max: number;
  private step: number;
  private onChange: (level: number) => void;

  constructor(config: { min: number; max: number; step: number; default: number }, onChange: (level: number) => void) {
    this.min = config.min;
    this.max = config.max;
    this.step = config.step;
    this.level = config.default;
    this.onChange = onChange;
  }

  zoomIn(): number {
    this.level = Math.min(this.max, this.level + this.step);
    this.onChange(this.level);
    return this.level;
  }

  zoomOut(): number {
    this.level = Math.max(this.min, this.level - this.step);
    this.onChange(this.level);
    return this.level;
  }

  reset(): number {
    this.level = 100;
    this.onChange(this.level);
    return this.level;
  }

  setLevel(level: number): number {
    this.level = Math.min(this.max, Math.max(this.min, level));
    this.onChange(this.level);
    return this.level;
  }

  getLevel(): number {
    return this.level;
  }

  getPercentage(): string {
    return this.level + '%';
  }
}
