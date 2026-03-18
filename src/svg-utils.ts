export function svgToBlob(svgString: string): Blob {
  return new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
}
export function svgToDataUrl(svgString: string): string {
  const blob = svgToBlob(svgString);
  return URL.createObjectURL(blob);
}
export function addWhiteBackground(svgEl: SVGSVGElement): SVGSVGElement {
  const clone = svgEl.cloneNode(true) as SVGSVGElement;
  const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  bg.setAttribute('width', '100%'); bg.setAttribute('height', '100%'); bg.setAttribute('fill', 'white');
  clone.insertBefore(bg, clone.firstChild);
  return clone;
}
export function fixSvgTextColors(svgEl: SVGSVGElement): void {
  svgEl.querySelectorAll('text').forEach(t => {
    const fill = t.getAttribute('fill');
    if (fill && (fill.includes('#e8e8f0') || fill.includes('#a0a0c0'))) t.setAttribute('fill', '#333');
  });
}
export function serializeSvg(svgEl: SVGSVGElement): string {
  return new XMLSerializer().serializeToString(svgEl);
}
