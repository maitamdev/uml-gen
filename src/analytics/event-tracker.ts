// Analytics Event Tracker
type EventCategory = 'diagram' | 'export' | 'ui' | 'api' | 'error';

interface AnalyticsEvent {
  category: EventCategory;
  action: string;
  label?: string;
  value?: number;
  timestamp: number;
}

const eventLog: AnalyticsEvent[] = [];

export function trackEvent(category: EventCategory, action: string, label?: string, value?: number): void {
  const event: AnalyticsEvent = { category, action, label, value, timestamp: Date.now() };
  eventLog.push(event);
  if (eventLog.length > 1000) eventLog.splice(0, 500);
}

export function trackDiagramGenerated(type: string, duration: number): void {
  trackEvent('diagram', 'generate', type, duration);
}

export function trackExport(format: string): void {
  trackEvent('export', 'download', format);
}

export function trackError(code: string, message: string): void {
  trackEvent('error', code, message);
}

export function getEventLog(): AnalyticsEvent[] {
  return [...eventLog];
}

export function clearEventLog(): void {
  eventLog.length = 0;
}
