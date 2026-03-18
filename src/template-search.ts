import { removeVietnameseTones } from './utils/string-utils';
export interface SearchResult { key: string; name: string; score: number; }
export function searchTemplates(query: string, templates: Record<string, { name: string; description: string }>): SearchResult[] {
  const q = removeVietnameseTones(query.toLowerCase());
  return Object.entries(templates)
    .map(([key, tmpl]) => {
      const name = removeVietnameseTones(tmpl.name.toLowerCase());
      const desc = removeVietnameseTones(tmpl.description.toLowerCase());
      let score = 0;
      if (name.includes(q)) score += 10;
      if (desc.includes(q)) score += 5;
      q.split(/\s+/).forEach(word => { if (name.includes(word)) score += 3; if (desc.includes(word)) score += 1; });
      return { key, name: tmpl.name, score };
    })
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score);
}
