// Skeleton Loader Component
export function createSkeleton(lines: number = 3, animate = true): HTMLElement {
  const wrapper = document.createElement('div');
  wrapper.className = 'skeleton-wrapper';
  for (let i = 0; i < lines; i++) {
    const line = document.createElement('div');
    line.className = 'skeleton-line';
    if (animate) line.classList.add('skeleton-animate');
    line.style.width = (70 + Math.random() * 30) + '%';
    if (i === 0) line.style.height = '1.5rem';
    wrapper.appendChild(line);
  }
  return wrapper;
}

export function createSkeletonCard(): HTMLElement {
  const card = document.createElement('div');
  card.className = 'skeleton-card';
  card.innerHTML = `
    <div class="skeleton-line skeleton-animate" style="width:40%;height:1.2rem"></div>
    <div class="skeleton-line skeleton-animate" style="width:100%"></div>
    <div class="skeleton-line skeleton-animate" style="width:80%"></div>
    <div class="skeleton-line skeleton-animate" style="width:60%"></div>
  `;
  return card;
}

export function removeSkeleton(container: HTMLElement): void {
  container.querySelectorAll('.skeleton-wrapper, .skeleton-card').forEach(s => s.remove());
}
