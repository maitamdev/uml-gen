export interface FeatureFlags {
  enableHistory: boolean;
  enableAnalytics: boolean;
  enableExperimentalDiagrams: boolean;
  enableAutoSave: boolean;
  enableSoundEffects: boolean;
  maxDiagramTypes: number;
}
const defaultFlags: FeatureFlags = {
  enableHistory: true,
  enableAnalytics: false,
  enableExperimentalDiagrams: false,
  enableAutoSave: true,
  enableSoundEffects: false,
  maxDiagramTypes: 6,
};
let flags: FeatureFlags = { ...defaultFlags };
export function getFeatureFlags(): FeatureFlags { return { ...flags }; }
export function setFeatureFlag<K extends keyof FeatureFlags>(key: K, value: FeatureFlags[K]): void { flags[key] = value; }
export function isFeatureEnabled(key: keyof FeatureFlags): boolean { return Boolean(flags[key]); }
export function resetFeatureFlags(): void { flags = { ...defaultFlags }; }
