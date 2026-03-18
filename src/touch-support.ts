export function enableTouchZoom(container: HTMLElement, onChange: (scale: number) => void): void {
  let initialDist = 0;
  let currentScale = 1;
  container.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      initialDist = Math.sqrt(dx * dx + dy * dy);
    }
  }, { passive: true });
  container.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2 && initialDist > 0) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      currentScale = Math.max(0.25, Math.min(3, currentScale * (dist / initialDist)));
      initialDist = dist;
      onChange(currentScale);
    }
  }, { passive: true });
}
