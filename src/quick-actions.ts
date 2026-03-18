export interface QuickAction { id: string; label: string; icon: string; shortcut?: string; handler: () => void; }
const actions: QuickAction[] = [];
export function registerQuickAction(action: QuickAction): void { actions.push(action); }
export function getQuickActions(): QuickAction[] { return [...actions]; }
export function executeAction(id: string): boolean {
  const action = actions.find(a => a.id === id);
  if (action) { action.handler(); return true; }
  return false;
}
export function removeAction(id: string): void {
  const idx = actions.findIndex(a => a.id === id);
  if (idx >= 0) actions.splice(idx, 1);
}
