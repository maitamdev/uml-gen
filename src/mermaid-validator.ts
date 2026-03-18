const VALID_PREFIXES = ['flowchart', 'sequenceDiagram', 'classDiagram', 'erDiagram', 'stateDiagram', 'gantt', 'pie', 'graph'];
export function isValidMermaidPrefix(code: string): boolean {
  const firstLine = code.trim().split('\n')[0].trim();
  return VALID_PREFIXES.some(p => firstLine.startsWith(p));
}
export function detectDiagramType(code: string): string {
  const firstLine = code.trim().split('\n')[0].trim().toLowerCase();
  if (firstLine.startsWith('flowchart lr')) return 'usecase';
  if (firstLine.startsWith('flowchart td') || firstLine.startsWith('flowchart tb')) return 'activity';
  if (firstLine.startsWith('sequencediagram')) return 'sequence';
  if (firstLine.startsWith('classdiagram')) return 'class';
  if (firstLine.startsWith('erdiagram')) return 'erd';
  if (firstLine.startsWith('statediagram')) return 'state';
  return 'unknown';
}
export function countNodes(code: string): number {
  const nodePattern = /\w+[\[\({"]/g;
  return (code.match(nodePattern) || []).length;
}
export function countEdges(code: string): number {
  const edgePattern = /-->/g;
  return (code.match(edgePattern) || []).length;
}
