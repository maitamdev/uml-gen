// ============================================
// Export Module - PNG, SVG, Copy Code
// ============================================

export function exportSvg(svgString: string, filename: string = 'diagram'): void {
  const blob = new Blob([svgString], { type: 'image/svg+xml' });
  downloadBlob(blob, `${filename}.svg`);
}

export async function exportPng(
  svgString: string,
  filename: string = 'diagram',
  scale: number = 2
): Promise<void> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      reject(new Error('Cannot create canvas context'));
      return;
    }

    const img = new Image();
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      
      // Dark background
      ctx.fillStyle = '#0a0a1a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.scale(scale, scale);
      ctx.drawImage(img, 0, 0);
      
      canvas.toBlob((blob) => {
        if (blob) {
          downloadBlob(blob, `${filename}.png`);
          resolve();
        } else {
          reject(new Error('Failed to create PNG blob'));
        }
        URL.revokeObjectURL(url);
