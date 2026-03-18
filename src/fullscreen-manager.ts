export class FullscreenManager {
  private panel: HTMLElement | null = null;
  private isActive = false;
  attach(panel: HTMLElement): void { this.panel = panel; }
  toggle(): void { this.isActive ? this.exit() : this.enter(); }
  enter(): void {
    if (!this.panel) return;
    this.panel.classList.add('fullscreen');
    document.body.style.overflow = 'hidden';
    this.isActive = true;
  }
  exit(): void {
    if (!this.panel) return;
    this.panel.classList.remove('fullscreen');
    document.body.style.overflow = '';
    this.isActive = false;
  }
  getState(): boolean { return this.isActive; }
}
export const fullscreenManager = new FullscreenManager();
