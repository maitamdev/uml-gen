export class LoadingManager {
  private states: Map<string, boolean> = new Map();
  private listeners: Array<() => void> = [];
  set(key: string, loading: boolean): void {
    this.states.set(key, loading);
    this.notify();
  }
  get(key: string): boolean { return this.states.get(key) || false; }
  isAnyLoading(): boolean { return Array.from(this.states.values()).some(v => v); }
  onUpdate(cb: () => void): void { this.listeners.push(cb); }
  private notify(): void { this.listeners.forEach(cb => cb()); }
  reset(): void { this.states.clear(); this.notify(); }
}
export const loadingManager = new LoadingManager();
