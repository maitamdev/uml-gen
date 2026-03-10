// Dropdown Menu Component
export interface DropdownItem {
  value: string;
  label: string;
  icon?: string;
  description?: string;
}

export class DropdownController {
  private isOpen = false;
  private trigger: HTMLElement;
  private menu: HTMLElement;

  constructor(triggerId: string, menuId: string) {
    this.trigger = document.getElementById(triggerId)!;
    this.menu = document.getElementById(menuId)!;
    this.setupListeners();
  }

  private setupListeners(): void {
    this.trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggle();
    });
    document.addEventListener('click', () => this.close());
  }

  toggle(): void {
    this.isOpen = !this.isOpen;
    this.menu.classList.toggle('open', this.isOpen);
  }

  open(): void {
    this.isOpen = true;
    this.menu.classList.add('open');
  }

  close(): void {
    this.isOpen = false;
    this.menu.classList.remove('open');
  }

  getState(): boolean {
    return this.isOpen;
  }
}
