export function generateExportFilename(diagramType: string, format: string): string {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replace(/-/g, '');
  const time = now.toTimeString().slice(0, 5).replace(':', '');
  return 'uml-' + diagramType + '-' + date + '-' + time + '.' + format;
}
export function getExportTitle(type: string): string {
  const titles: Record<string, string> = {
    usecase: 'Use Case Diagram', activity: 'Activity Diagram',
    sequence: 'Sequence Diagram', class: 'Class Diagram',
    erd: 'ERD Diagram', state: 'State Diagram',
  };
  return titles[type] || 'UML Diagram';
}
