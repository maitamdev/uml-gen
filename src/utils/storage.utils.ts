// LocalStorage wrapper with JSON support and expiry
const PREFIX = 'uml-gen-';

export function getItem<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    if (raw === null) return fallback;
    const parsed = JSON.parse(raw);
    if (parsed.expiry && Date.now() > parsed.expiry) {
      localStorage.removeItem(PREFIX + key);
      return fallback;
    }
    return parsed.value as T;
  } catch {
    return fallback;
  }
}

export function setItem<T>(key: string, value: T, ttlMs?: number): void {
  const data = { value, expiry: ttlMs ? Date.now() + ttlMs : null };
  localStorage.setItem(PREFIX + key, JSON.stringify(data));
}

export function removeItem(key: string): void {
  localStorage.removeItem(PREFIX + key);
}

export function clearAll(): void {
  Object.keys(localStorage)
    .filter(k => k.startsWith(PREFIX))
    .forEach(k => localStorage.removeItem(k));
}
