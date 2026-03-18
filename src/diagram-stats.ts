export interface DiagramStats {
  nodeCount: number;
  edgeCount: number;
  actorCount: number;
  usecaseCount: number;
  codeLength: number;
  lineCount: number;
}
export function analyzeDiagram(code: string): DiagramStats {
  const lines = code.split('\n');
  return {
    nodeCount: (code.match(/\w+\[/g) || []).length + (code.match(/\w+\(\[/g) || []).length,
    edgeCount: (code.match(/-->/g) || []).length + (code.match(/-\.->|->>/g) || []).length,
    actorCount: (code.match(/actor\s/g) || []).length + (code.match(/\["ðŸ‘¤/g) || []).length,
    usecaseCount: (code.match(/\(\["/g) || []).length,
    codeLength: code.length,
    lineCount: lines.length,
  };
}
export function formatStats(stats: DiagramStats): string {
  return [
    stats.nodeCount + ' nodes',  stats.edgeCount + ' edges',
    stats.actorCount + ' actors', stats.lineCount + ' lines'
  ].join(' | ');
}
