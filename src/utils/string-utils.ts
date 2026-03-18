export function truncate(str: string, maxLen: number): string {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen - 3) + '...';
}
export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export function slugify(str: string): string {
  return str.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').trim();
}
export function escapeHtml(str: string): string {
  const map: Record<string, string> = {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'};
  return str.replace(/[&<>"']/g, m => map[m] || m);
}
export function removeVietnameseTones(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/Ä‘/g,'d').replace(/Ä/g,'D');
}
export function countWords(str: string): number {
  return str.trim().split(/\s+/).filter(w => w.length > 0).length;
}
export function formatTimestamp(date: Date): string {
  return date.toLocaleString('vi-VN', { year:'numeric', month:'2-digit', day:'2-digit', hour:'2-digit', minute:'2-digit' });
}
