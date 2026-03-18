export async function copyTextToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  }
}
export async function copyImageToClipboard(blob: Blob): Promise<boolean> {
  try {
    await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
    return true;
  } catch { return false; }
}
export async function readClipboardText(): Promise<string> {
  try { return await navigator.clipboard.readText(); }
  catch { return ''; }
}
