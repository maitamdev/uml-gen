export function playNotificationSound(type: 'success' | 'error' = 'success'): void {
  const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain); gain.connect(ctx.destination);
  osc.type = 'sine';
  osc.frequency.value = type === 'success' ? 800 : 400;
  gain.gain.value = 0.1;
  osc.start(); osc.stop(ctx.currentTime + 0.15);
}
export function vibrate(pattern: number | number[] = 50): void {
  if (navigator.vibrate) navigator.vibrate(pattern);
}
