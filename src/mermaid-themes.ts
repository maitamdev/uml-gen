export interface MermaidThemePreset { name: string; variables: Record<string, string>; }
export const THEME_PRESETS: MermaidThemePreset[] = [
  { name: 'Default', variables: { primaryColor: '#4ecdc4', secondaryColor: '#ff6b6b', tertiaryColor: '#a29bfe', lineColor: '#636e72', background: '#ffffff' } },
  { name: 'Ocean', variables: { primaryColor: '#0ea5e9', secondaryColor: '#06b6d4', tertiaryColor: '#3b82f6', lineColor: '#475569', background: '#f0f9ff' } },
  { name: 'Forest', variables: { primaryColor: '#22c55e', secondaryColor: '#84cc16', tertiaryColor: '#14b8a6', lineColor: '#4b5563', background: '#f0fdf4' } },
  { name: 'Sunset', variables: { primaryColor: '#f97316', secondaryColor: '#ef4444', tertiaryColor: '#eab308', lineColor: '#78716c', background: '#fffbeb' } },
  { name: 'Minimal', variables: { primaryColor: '#6b7280', secondaryColor: '#9ca3af', tertiaryColor: '#d1d5db', lineColor: '#374151', background: '#ffffff' } },
];
export function getThemePreset(name: string): MermaidThemePreset | undefined {
  return THEME_PRESETS.find(p => p.name === name);
}
