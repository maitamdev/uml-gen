interface AnalyticsEvent { name: string; properties?: Record<string, any>; timestamp: number; }
const events: AnalyticsEvent[] = [];
export function trackEvent(name: string, properties?: Record<string, any>): void {
  events.push({ name, properties, timestamp: Date.now() });
  if (events.length > 100) events.shift();
}
export function trackGeneration(type: string, provider: string, success: boolean): void {
  trackEvent('generate', { type, provider, success });
}
export function trackExport(format: string): void {
  trackEvent('export', { format });
}
export function trackTemplateUse(template: string): void {
  trackEvent('template', { template });
}
export function getEventLog(): AnalyticsEvent[] { return [...events]; }
export function getEventCount(name: string): number { return events.filter(e => e.name === name).length; }
