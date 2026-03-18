export function showConfetti(duration: number = 2000): void {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;inset:0;z-index:9999;pointer-events:none';
  canvas.width = window.innerWidth; canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;
  const particles = Array.from({ length: 60 }, () => ({
    x: Math.random() * canvas.width, y: -10, vx: (Math.random() - 0.5) * 4,
    vy: Math.random() * 3 + 2, size: Math.random() * 6 + 4,
    color: ['#818cf8','#c084fc','#4ecdc4','#ff6b6b','#ffd700'][Math.floor(Math.random() * 5)],
    rotation: Math.random() * 360,
  }));
  const start = Date.now();
  function draw() {
    if (Date.now() - start > duration) { canvas.remove(); return; }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rotation * Math.PI / 180);
      ctx.fillStyle = p.color; ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size/2);
      ctx.restore();
      p.x += p.vx; p.y += p.vy; p.rotation += 3; p.vy += 0.05;
    });
    requestAnimationFrame(draw);
  }
  draw();
}
