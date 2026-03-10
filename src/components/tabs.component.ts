// Tab Controller Component
export interface TabConfig {
  type: string;
  label: string;
  icon: string;
}

export class TabController {
  private tabs: TabConfig[];
  private activeTab: string;
  private onChange: (type: string) => void;

  constructor(tabs: TabConfig[], defaultTab: string, onChange: (type: string) => void) {
    this.tabs = tabs;
    this.activeTab = defaultTab;
    this.onChange = onChange;
  }

  getActiveTab(): string {
    return this.activeTab;
  }

  setActiveTab(type: string): void {
    if (this.tabs.some(t => t.type === type)) {
      this.activeTab = type;
      this.onChange(type);
    }
  }

  nextTab(): void {
    const idx = this.tabs.findIndex(t => t.type === this.activeTab);
    const next = (idx + 1) % this.tabs.length;
    this.setActiveTab(this.tabs[next].type);
  }

  prevTab(): void {
    const idx = this.tabs.findIndex(t => t.type === this.activeTab);
    const prev = (idx - 1 + this.tabs.length) % this.tabs.length;
    this.setActiveTab(this.tabs[prev].type);
  }

  getTabs(): TabConfig[] {
    return [...this.tabs];
  }
}
