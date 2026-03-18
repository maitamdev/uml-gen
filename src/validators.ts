export function isValidUrl(url: string): boolean {
  try { new URL(url); return true; } catch { return false; }
}
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
export function isValidHexColor(color: string): boolean {
  return /^#([0-9A-F]{3}|[0-9A-F]{6})$/i.test(color);
}
export function isValidJson(str: string): boolean {
  try { JSON.parse(str); return true; } catch { return false; }
}
export function isNonEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
}
