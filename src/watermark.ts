export function addWatermark(svgEl: SVGSVGElement, text: string = 'UML Generator'): void {
  const textEl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  textEl.setAttribute('x', '99%'); textEl.setAttribute('y', '99%');
  textEl.setAttribute('text-anchor', 'end'); textEl.setAttribute('dominant-baseline', 'auto');
  textEl.setAttribute('fill', 'rgba(150,150,150,0.3)'); textEl.setAttribute('font-size', '10');
  textEl.setAttribute('font-family', 'Inter, sans-serif');
  textEl.textContent = text;
  svgEl.appendChild(textEl);
}
export function removeWatermark(svgEl: SVGSVGElement): void {
  const texts = svgEl.querySelectorAll('text');
  texts.forEach(t => { if (t.textContent === 'UML Generator') t.remove(); });
}
