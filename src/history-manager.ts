export interface HistoryEntry {
  id: string;
  input: string;
  timestamp: number;
  diagramTypes: string[];
}
const HISTORY_KEY = 'uml-gen-history';
const MAX_HISTORY = 20;
export function getHistory(): HistoryEntry[] {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]'); }
  catch { return []; }
}
export function addToHistory(input: string, types: string[]): void {
  const history = getHistory();
  const entry: HistoryEntry = { id: Date.now().toString(36), input, timestamp: Date.now(), diagramTypes: types };
  history.unshift(entry);
  if (history.length > MAX_HISTORY) history.pop();
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}
export function clearHistory(): void { localStorage.removeItem(HISTORY_KEY); }
export function removeFromHistory(id: string): void {
  const history = getHistory().filter(h => h.id !== id);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}
