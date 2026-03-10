// Progress Bar Component
export class ProgressBar {
  private element: HTMLElement;
  private fill: HTMLElement;
  private label: HTMLElement;
  private value: number = 0;

  constructor(container: HTMLElement) {
    this.element = document.createElement('div');
    this.element.className = 'progress-bar';
    this.fill = document.createElement('div');
    this.fill.className = 'progress-bar-fill';
    this.label = document.createElement('span');
    this.label.className = 'progress-bar-label';
    this.element.appendChild(this.fill);
    this.element.appendChild(this.label);
    container.appendChild(this.element);
  }

  setValue(percent: number): void {
    this.value = Math.min(100, Math.max(0, percent));
    this.fill.style.width = this.value + '%';
    this.label.textContent = Math.round(this.value) + '%';
  }

  getValue(): number {
    return this.value;
  }

  setIndeterminate(active: boolean): void {
    this.element.classList.toggle('progress-indeterminate', active);
  }

  destroy(): void {
    this.element.remove();
  }
}
