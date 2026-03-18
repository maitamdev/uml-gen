export function setCSSVar(name: string, value: string): void {
  document.documentElement.style.setProperty('--' + name, value);
}
export function getCSSVar(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue('--' + name).trim();
}
export function setMultipleCSSVars(vars: Record<string, string>): void {
  Object.entries(vars).forEach(([name, value]) => setCSSVar(name, value));
}
export const CSS_VARS = {
  PRIMARY: 'primary', SECONDARY: 'secondary', ACCENT: 'accent',
  SURFACE: 'surface', BACKGROUND: 'background', TEXT: 'text',
  TEXT_MUTED: 'text-muted', BORDER: 'border', RADIUS: 'radius',
};
