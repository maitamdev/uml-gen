export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url; link.download = filename;
  document.body.appendChild(link); link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
export function downloadText(content: string, filename: string, mimeType: string = 'text/plain'): void {
  const blob = new Blob([content], { type: mimeType });
  downloadBlob(blob, filename);
}
export function downloadSvg(svgString: string, filename: string): void {
  downloadText(svgString, filename + '.svg', 'image/svg+xml');
}
export function downloadJson(data: any, filename: string): void {
  downloadText(JSON.stringify(data, null, 2), filename + '.json', 'application/json');
}
