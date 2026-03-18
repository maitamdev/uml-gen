export async function shareViaUrl(diagramCode: string): Promise<string> {
  const encoded = btoa(encodeURIComponent(diagramCode));
  const url = window.location.origin + window.location.pathname + '?code=' + encoded;
  try { await navigator.clipboard.writeText(url); } catch {}
  return url;
}
export function getSharedCode(): string | null {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');
  if (!code) return null;
  try { return decodeURIComponent(atob(code)); } catch { return null; }
}
export async function shareViaNative(title: string, text: string, url: string): Promise<boolean> {
  if (!navigator.share) return false;
  try { await navigator.share({ title, text, url }); return true; } catch { return false; }
}
