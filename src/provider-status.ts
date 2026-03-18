export interface ProviderStatus {
  name: string;
  isAvailable: boolean;
  lastChecked: number;
  responseTime?: number;
}
const statusCache: Map<string, ProviderStatus> = new Map();
export function getCachedStatus(name: string): ProviderStatus | undefined { return statusCache.get(name); }
export function setCachedStatus(status: ProviderStatus): void { statusCache.set(status.name, status); }
export function isStatusStale(name: string, maxAge: number = 60000): boolean {
  const cached = statusCache.get(name);
  if (!cached) return true;
  return Date.now() - cached.lastChecked > maxAge;
}
export function clearStatusCache(): void { statusCache.clear(); }
