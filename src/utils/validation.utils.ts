// Input validation utilities
export function isNonEmpty(value: string): boolean {
  return value.trim().length > 0;
}

export function isValidApiKey(key: string, provider: string): boolean {
  if (provider === 'huggingface') return /^hf_[a-zA-Z0-9]{10,}$/.test(key);
  if (provider === 'groq') return /^gsk_[a-zA-Z0-9]{10,}$/.test(key);
  return key.length > 10;
}

export function isValidUrl(url: string): boolean {
  try { new URL(url); return true; } catch { return false; }
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function isWithinRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

export function sanitizeInput(input: string): string {
  return input.replace(/<[^>]*>/g, '').trim();
}
