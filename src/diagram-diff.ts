export function compareDiagrams(oldCode: string, newCode: string): { added: string[]; removed: string[]; unchanged: number } {
  const oldLines = new Set(oldCode.split('\n').map(l => l.trim()).filter(Boolean));
  const newLines = new Set(newCode.split('\n').map(l => l.trim()).filter(Boolean));
  const added = [...newLines].filter(l => !oldLines.has(l));
  const removed = [...oldLines].filter(l => !newLines.has(l));
  const unchanged = [...oldLines].filter(l => newLines.has(l)).length;
  return { added, removed, unchanged };
}
export function getDiffSummary(old: string, next: string): string {
  const diff = compareDiagrams(old, next);
  return '+' + diff.added.length + ' -' + diff.removed.length + ' =' + diff.unchanged;
}
