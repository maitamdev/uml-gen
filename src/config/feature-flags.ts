// Feature flags system
const defaults = { enablePWA: true, enableI18n: true, enableDarkMode: true, debugMode: false };
export function getFlags() { try { const s = localStorage.getItem('uml-gen-flags'); return s ? { ...defaults, ...JSON.parse(s) } : defaults; } catch { return defaults; } }
export function isEnabled(flag: string): boolean { return (getFlags() as Record<string, boolean>)[flag] ?? false; }
