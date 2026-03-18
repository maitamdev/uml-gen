export function formatDate(date: Date): string {
  return date.toLocaleDateString('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit' });
}
export function formatRelative(date: Date): string {
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'vá»«a xong';
  if (mins < 60) return mins + ' phÃºt trÆ°á»›c';
  const hours = Math.floor(mins / 60);
  if (hours < 24) return hours + ' giá» trÆ°á»›c';
  const days = Math.floor(hours / 24);
  return days + ' ngÃ y trÆ°á»›c';
}
export function isToday(date: Date): boolean {
  const today = new Date();
  return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
}
