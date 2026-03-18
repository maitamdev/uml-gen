const AUTOSAVE_KEY = 'uml-gen-autosave';
const AUTOSAVE_INTERVAL = 30000;
let timer: ReturnType<typeof setInterval> | null = null;
export interface AutoSaveData { input: string; diagrams: Record<string, string>; currentType: string; timestamp: number; }
export function saveState(data: Omit<AutoSaveData, 'timestamp'>): void {
  localStorage.setItem(AUTOSAVE_KEY, JSON.stringify({ ...data, timestamp: Date.now() }));
}
export function loadState(): AutoSaveData | null {
  try { const raw = localStorage.getItem(AUTOSAVE_KEY); return raw ? JSON.parse(raw) : null; }
  catch { return null; }
}
export function clearAutoSave(): void { localStorage.removeItem(AUTOSAVE_KEY); }
export function startAutoSave(getData: () => Omit<AutoSaveData, 'timestamp'>): void {
  stopAutoSave();
  timer = setInterval(() => saveState(getData()), AUTOSAVE_INTERVAL);
}
export function stopAutoSave(): void { if (timer) { clearInterval(timer); timer = null; } }
