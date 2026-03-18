export class TabManager {
  private activeTab: string = '';
  private tabs: Map<string, HTMLElement> = new Map();
  private onChangeCallbacks: Array<(tab: string) => void> = [];
  register(id: string, el: HTMLElement): void { this.tabs.set(id, el); }
  activate(id: string): void {
    this.tabs.forEach((el, key) => el.classList.toggle('active', key === id));
    this.activeTab = id;
    this.onChangeCallbacks.forEach(cb => cb(id));
  }
  getActive(): string { return this.activeTab; }
  onChange(cb: (tab: string) => void): void { this.onChangeCallbacks.push(cb); }
}
