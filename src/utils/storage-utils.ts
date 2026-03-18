export function getStorageItem<T>(key: string, defaultValue: T): T {
  try { const item = localStorage.getItem(key); return item ? JSON.parse(item) as T : defaultValue; }
  catch { return defaultValue; }
}
export function setStorageItem<T>(key: string, value: T): void {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { console.warn('localStorage error:', e); }
}
export function removeStorageItem(key: string): void { localStorage.removeItem(key); }
export function hasStorageItem(key: string): boolean { return localStorage.getItem(key) !== null; }
